import type { EmbedStructure } from "lilybird";

declare global {
    interface EmbedStructureWithId extends EmbedStructure {
        id: string;
        discord_embed_id: string;
    }        
}

export { };