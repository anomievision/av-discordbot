import type { EmbedStructure } from "lilybird";

declare global {
    interface EmbedStructureWithId extends EmbedStructure {
        id: string;
        channel_id: string;
        message_id: string;
    }        
}

export { };