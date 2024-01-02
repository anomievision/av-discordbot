import type { 
    Awaitable, 
    ClientEventListeners, 
    Message, 
    POSTApplicationCommandStructure, 
    ApplicationCommandData, 
    AutocompleteData, 
    GuildInteraction, 
    Interaction 
} from "lilybird";

declare global {
    namespace Handlers {
        interface Event<E extends keyof ClientEventListeners = keyof ClientEventListeners, T extends Required<ClientEventListeners> = Required<ClientEventListeners>> {
            name?: string;
            event: E;
            run: (...args: Parameters<T[E]>) => Awaitable<any>;
        }

        interface MessageCommand {
            name: string;
            alias?: Array<string>;
            description?: string;
            enabled?: boolean;
            run: (message: Message, args: Array<string>) => Awaitable<unknown>;
        }

        interface GlobalSlashCommand {
            data: POSTApplicationCommandStructure;
            post: "GLOBAL";
            autocomplete?: (interaction: Interaction<AutocompleteData>) => Awaitable<any>;
            run: (interaction: Interaction<ApplicationCommandData>) => Awaitable<any>;
        }

        interface GuildSlashCommand {
            data: POSTApplicationCommandStructure;
            post: Guild;
            autocomplete?: (interaction: GuildInteraction<AutocompleteData>) => Awaitable<any>;
            run: (interaction: GuildInteraction<ApplicationCommandData>) => Awaitable<any>;
        }

        type SlashCommand = GuildSlashCommand | GlobalSlashCommand;

        type Guild = `${number}` | Array<`${number}`>;

        type Directories = {
            slashCommands?: string;
            messageCommands?: string;
            listeners?: string;
        }
    }    
}

export { };