import type { Database } from "av-database";
import type { EmbedStructure } from "lilybird";

export function extractEmbedStructure(embedFromDb: Database.Discord.Embed.Select): { channelId: string, messageId: string | null, name: string, embed: EmbedStructure } {
    const embed: EmbedStructure = {
        title: embedFromDb.title ?? undefined,
        description: embedFromDb.description ?? undefined,
        url: embedFromDb.url ?? undefined,
        timestamp: embedFromDb.timestamp ?? undefined,
        color: embedFromDb.color ?? undefined,
        footer: embedFromDb.footerText
            ? {
                text: embedFromDb.footerText,
                icon_url: embedFromDb.footerIconUrl ?? undefined,
                proxy_icon_url: embedFromDb.footerProxyIconUrl ?? undefined
            }
            : undefined,
        image: embedFromDb.imageUrl
            ? {
                url: embedFromDb.imageUrl,
                proxy_url: embedFromDb.imageProxyUrl ?? undefined,
                height: embedFromDb.imageHeight ?? undefined,
                width: embedFromDb.imageWidth ?? undefined
            }
            : undefined,
        thumbnail: embedFromDb.thumbnailUrl
            ? {
                url: embedFromDb.thumbnailUrl,
                proxy_url: embedFromDb.thumbnailProxyUrl ?? undefined,
                height: embedFromDb.thumbnailHeight ?? undefined,
                width: embedFromDb.thumbnailWidth ?? undefined
            }
            : undefined,
        video: embedFromDb.videoUrl
            ? {
                url: embedFromDb.videoUrl,
                proxy_url: embedFromDb.videoProxyUrl ?? undefined,
                height: embedFromDb.videoHeight ?? undefined,
                width: embedFromDb.videoWidth ?? undefined
            }
            : undefined,
        provider: embedFromDb.providerName ?? embedFromDb.providerUrl
            ? {
                name: embedFromDb.providerName ?? undefined,
                url: embedFromDb.providerUrl ?? undefined
            }
            : undefined
    };

    return {
        channelId: embedFromDb.channelId,
        messageId: embedFromDb.messageId,
        name: embedFromDb.name,
        embed
    };
}
