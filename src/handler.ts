import { doesDiscordEmbedExist, useLogger, useQuerySelectEmbed, useSupabaseServiceClient } from "#utils";
import { ChannelType } from "lilybird";
import type {
    ClientEventListeners,
    BaseClientOptions,
    Interaction,
    Message,
    Client,
    MessageStructure
} from "lilybird";

export class Handler {
    protected readonly events = new Map<Handlers.Event["event"], Handlers.Event>();
    protected readonly guildSlashCommands = new Map<string, Handlers.GuildSlashCommand>();
    protected readonly globalSlashCommands = new Map<string, Handlers.GlobalSlashCommand>();
    protected readonly messageCommands = new Map<Array<string>, Handlers.MessageCommand>();
    protected readonly autoEmbeds = new Map<string, Handlers.AutoEmbed>();

    protected readonly dirs: Handlers.Directories;
    protected readonly prefix: string;

    public constructor(dirs: Handlers.Directories, prefix?: string) {
        this.dirs = dirs;
        this.prefix = prefix ?? "!";
    }

    // Listeners
    public async readEventDir(dir: string | undefined = this.dirs.listeners): Promise<boolean> {
        if (typeof dir === "undefined") return false;

        const router = new Bun.FileSystemRouter({
            fileExtensions: [".ts", ".tsx", ".js", ".jsx"],
            style: "nextjs",
            dir
        });

        for (let i = 0, values = Object.values(router.routes), { length } = values; i < length; i++) {
            const val = values[i];

            // Lazy solution, could probably be better
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-await-in-loop
            const file: Handlers.Event = (await import(val)).default;
            if (typeof file === "undefined") continue;

            this.events.set(file.event, file);

            // eslint-disable-next-line no-await-in-loop
            await useLogger("info", "handler", `Loaded event: ${file.event}`);
        }

        return true;
    }

    public async readSlashCommandDir(dir: string | undefined = this.dirs.slashCommands): Promise<boolean> {
        if (typeof dir === "undefined") return false;

        const router = new Bun.FileSystemRouter({
            fileExtensions: [".ts", ".tsx", ".js", ".jsx"],
            style: "nextjs",
            dir
        });

        for (let i = 0, entries = Object.entries(router.routes), { length } = entries; i < length; i++) {
            const [key, val] = entries[i];

            // Lazy solution, could probably be better
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-await-in-loop
            const file: Handlers.SlashCommand = (await import(val)).default;
            if (typeof file === "undefined") continue;

            if (key.startsWith("/guild") || file.post !== "GLOBAL") this.guildSlashCommands.set(file.data.name, <Handlers.GuildSlashCommand>file);
            else this.globalSlashCommands.set(file.data.name, file);

            // eslint-disable-next-line no-await-in-loop
            await useLogger("info", "handler", `Loaded slash command: ${file.data.name}`);
        }

        return true;
    }

    public async readMessageCommandDir(dir: string | undefined = this.dirs.messageCommands): Promise<boolean> {
        if (typeof dir === "undefined") return false;

        const router = new Bun.FileSystemRouter({
            fileExtensions: [".ts", ".tsx", ".js", ".jsx"],
            style: "nextjs",
            dir
        });

        for (let i = 0, values = Object.values(router.routes), { length } = values; i < length; i++) {
            const val = values[i];

            // Lazy solution, could probably be better
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-await-in-loop
            const file: Handlers.MessageCommand = (await import(val)).default;
            if (typeof file === "undefined") continue;

            this.messageCommands.set([file.name, ...file.alias ?? []], file);

            // eslint-disable-next-line no-await-in-loop
            await useLogger("info", "handler", `Loaded message command: ${file.name}`);
        }

        return true;
    }

    public async readAutoEmbedDir(dir: string | undefined = this.dirs.autoEmbeds): Promise<boolean> {
        if (typeof dir === "undefined") return false;

        const router = new Bun.FileSystemRouter({
            fileExtensions: [".ts", ".tsx", ".js", ".jsx"],
            style: "nextjs",
            dir
        });

        for (let i = 0, values = Object.values(router.routes), { length } = values; i < length; i++) {
            const val = values[i];

            // Lazy solution, could probably be better
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-await-in-loop
            const file: Handlers.AutoEmbed = (await import(val)).default;
            if (typeof file === "undefined") continue;

            this.autoEmbeds.set(file.name, file);

            // eslint-disable-next-line no-await-in-loop
            await useLogger("info", "handler", `Loaded auto-embed: ${file.name}`);
        }

        return true;
    }

    private async onInteraction(interaction: Interaction): Promise<void> {
        if (interaction.isApplicationCommandInteraction()) {
            if (interaction.inGuild())
                await useLogger("log", "handler", `Guild: ${interaction.guildId} | Channel: ${interaction.channelId} | User: ${interaction.member.user.id} | Command: /${interaction.data.name}`);

            await this.globalSlashCommands.get(interaction.data.name)?.run(interaction);
            if (interaction.inGuild()) await this.guildSlashCommands.get(interaction.data.name)?.run(interaction);
        } else if (interaction.isAutocompleteInteraction()) {
            if (interaction.inGuild())
                await useLogger("log", "handler", `Guild: ${interaction.guildId} | Channel: ${interaction.channelId} | User: ${interaction.member.user.id} | Command: /${interaction.data.name}`);

            await this.globalSlashCommands.get(interaction.data.name)?.autocomplete?.(interaction);
            if (interaction.inGuild()) await this.guildSlashCommands.get(interaction.data.name)?.autocomplete?.(interaction);
        }
    }

    private async onMessage(message: Message): Promise<void> {
        if (message.author.bot || (await message.client.rest.getChannel(message.channelId)).type === ChannelType.DM) return;

        if (message.content?.startsWith(this.prefix)) {
            await useLogger("info", "handler", `Guild: ${message.guildId} | Channel: ${message.channelId} | User: ${message.author.id} | Command: ${message.content}`);

            const args = message.content.slice(this.prefix.length).trim().split(/\s+/g);
            if (args.length === 0) return;

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const cmd = args.shift()!.toLowerCase();
            const key = [...this.messageCommands.keys()].find((keys) => keys.includes(cmd));
            if (typeof key === "undefined") return;

            const command = this.messageCommands.get(key);
            if (typeof command === "undefined") return;
            if (command.enabled ?? true) await command.run(message, args);
        }
    }

    public async buildListeners(): Promise<ClientEventListeners> {
        const eventsExist = await this.readEventDir();
        const slashCommandsExist = await this.readSlashCommandDir();
        const messageCommandsExist = await this.readMessageCommandDir();

        // eslint-disable-next-line func-style
        let interactionCreateFn: Exclude<ClientEventListeners["interactionCreate"], undefined> | undefined = undefined;

        // eslint-disable-next-line func-style
        let messageCreateFn: Exclude<ClientEventListeners["messageCreate"], undefined> | undefined = undefined;

        const listeners: ClientEventListeners = {};

        if (eventsExist) {
            for await (const [name, event] of this.events) {
                await useLogger("info", "listeners", `Processing event: ${name}`);

                if (name === "interactionCreate") {
                    interactionCreateFn = event.run;
                    continue;
                }

                if (name === "messageCreate") {
                    messageCreateFn = event.run;
                    continue;
                }

                listeners[name] = event.run;
            }
        }

        if (!slashCommandsExist) listeners.interactionCreate = interactionCreateFn;
        else if (typeof interactionCreateFn !== "undefined") {
            listeners.interactionCreate = async (interaction) => {
                //@ts-expect-error It is being checked above...
                await interactionCreateFn(interaction);
                await this.onInteraction(interaction);
            };
        } else {
            listeners.interactionCreate = async (interaction) => {
                await this.onInteraction(interaction);
            };
        }

        if (!messageCommandsExist) listeners.messageCreate = messageCreateFn;
        else if (typeof messageCreateFn !== "undefined") {
            listeners.messageCreate = async (message) => {
                //@ts-expect-error It is being checked above...
                await messageCreateFn(message);
                await this.onMessage(message);
            };
        } else {
            listeners.messageCreate = async (message) => {
                await this.onMessage(message);
            };
        }

        return listeners;
    }

    // Setup
    public async registerGlobalCommands(client: Client): Promise<void> {
        for await (const command of this.globalSlashCommands.values()) {
            await client.rest.createGlobalApplicationCommand(client.user.id, command.data);
            await useLogger("info", "handler", `Registered global slash command: ${command.data.name}`);
        }
    }

    public async registerGuildCommands(client: Client): Promise<void> {
        for await (const command of this.guildSlashCommands.values()) {
            if (Array.isArray(command.post)) {
                const temp: Array<Promise<unknown>> = [];
                for (let i = 0; i < command.post.length; i++) temp.push(client.rest.createGuildApplicationCommand(client.user.id, command.post[i], command.data));
                await Promise.all(temp);
            } else await client.rest.createGuildApplicationCommand(client.user.id, command.post, command.data);
            await useLogger("info", "handler", `Registered guild slash command: ${command.data.name}`);
        }
    }

    public async registerAutoEmbeds(client: Client): Promise<void> {
        const autoEmbedsExist = await this.readAutoEmbedDir();

        if (!autoEmbedsExist) return;

        for await (const embedFile of this.autoEmbeds.values()) {
            await useLogger("info", "listeners", `Processing auto-embed: ${embedFile.name}`);

            if (!embedFile.enabled) continue;

            let message;

            try {
                message = await this.createOrUpdateMessage(client, embedFile);
            } catch (error: unknown) {
                await useLogger("error", "handler", `Failed to create or update auto-embed: ${embedFile.name}: ${JSON.stringify(error)}`);
                continue;
            }

            if (message)
                await this.updateDatabase(embedFile, message.id);
        }
    }

    private async createOrUpdateMessage(client: Client, embedFile: Handlers.AutoEmbed): Promise<MessageStructure | undefined> {
        let message;

        const queryEmbed = await useQuerySelectEmbed(embedFile.channelId, { name: embedFile.name });

        if (typeof queryEmbed === "string" || !queryEmbed.messageId || !await doesDiscordEmbedExist(client.rest, embedFile.channelId, queryEmbed.messageId)) {
            message = await client.rest.createMessage(embedFile.channelId, { embeds: embedFile.embeds });
            await useLogger("info", "handler", `Created auto-embed: ${embedFile.name}`);
        } else {
            await client.rest.editMessage(embedFile.channelId, queryEmbed.messageId, { embeds: embedFile.embeds });
            await useLogger("info", "handler", `Updated auto-embed: ${embedFile.name}`);
        }

        return message;
    }

    private async updateDatabase(embedFile: Handlers.AutoEmbed, messageId: string): Promise<void> {
        const { error } = await useSupabaseServiceClient()
            .schema("discord")
            .from("embed")
            .upsert([
                {
                    channel_id: embedFile.channelId,
                    name: embedFile.name,
                    message_id: messageId
                }
            ]);

        if (error)
            await useLogger("error", "handler", `Failed to create or update auto-embed in Database: ${embedFile.name}`);
    }
}

// eslint-disable-next-line @typescript-eslint/ban-types
type Expand<T> = T extends Function ? T : { [K in keyof T]: T[K] };

export async function createHandler({
    dirs,
    prefix
}: {
    dirs: Handlers.Directories,
    prefix?: string | undefined
}): Promise<Expand<Pick<Required<BaseClientOptions>, "listeners" | "setup">>> {
    const handler = new Handler(dirs, prefix);

    return {
        listeners: await handler.buildListeners(),
        setup: async (client) => {
            await handler.registerGlobalCommands(client);
            await handler.registerGuildCommands(client);
            await handler.registerAutoEmbeds(client);
        }
    };
}
