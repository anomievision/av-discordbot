import { createHandler } from "./handler.js";
import { createClient, Intents } from "lilybird";
import type { Client, ClientOptions } from "lilybird";

export async function startClient(): Promise<Client> {
    const listeners = await createHandler({
        prefix: process.env.PREFIX,
        dirs: {
            listeners: `${import.meta.dir}/listeners`,
            slashCommands: `${import.meta.dir}/commands/slash`,
            messageCommands: `${import.meta.dir}/commands/message`,
            autoEmbeds: `${import.meta.dir}/embeds`
        }
    });

    const clientOptions: ClientOptions = {
        token: process.env.TOKEN,
        intents: [
            Intents.GUILDS,
            Intents.GUILD_MEMBERS,
            Intents.GUILD_MODERATION,
            Intents.GUILD_EMOJI_AND_STICKERS,
            Intents.GUILD_INTEGRATIONS,
            Intents.GUILD_WEBHOOKS,
            Intents.GUILD_INVITES,
            Intents.GUILD_VOICE_STATES,
            Intents.GUILD_PRESENCES,
            Intents.GUILD_MESSAGES,
            Intents.GUILD_MESSAGE_REACTIONS,
            Intents.GUILD_MESSAGE_TYPING,
            Intents.DIRECT_MESSAGES,
            Intents.DIRECT_MESSAGE_REACTIONS,
            Intents.DIRECT_MESSAGE_TYPING,
            Intents.MESSAGE_CONTENT,
            Intents.GUILD_SCHEDULED_EVENTS,
            Intents.AUTO_MODERATION_CONFIGURATION,
            Intents.AUTO_MODERATION_EXECUTION
        ],
        ...listeners,
        attachDebugListener: false,
        debugListener: (identifier, payload) => {
            console.log(identifier, payload ?? "");
        }
    };

    const client = await createClient(clientOptions);

    return client;
}
