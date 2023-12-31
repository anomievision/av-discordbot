import { prismaClient } from "@database";
import type { EmbedStructure } from "lilybird";

export async function getEmbedsFromDatabase(): Promise<Array<EmbedStructureWithId>> {
    const _embeds = await prismaClient.embed.findMany();

    const embeds = _embeds.map((embed) => {
        const _fields = embed.fields as unknown as Array<EmbedStructure>;

        return {
            id: embed.id,
            channel_id: embed.channel_id,
            message_id: embed.message_id,
            title: embed.title,
            type: embed.type,
            description: embed.description,
            url: embed.url,
            timestamp: embed.timestamp,
            color: embed.color,
            footer: {
                text: embed.footer_text,
                icon_url: embed.footer_icon_url,
                proxy_icon_url: embed.footer_proxy_icon_url
            },
            image: {
                url: embed.image_url,
                proxy_url: embed.image_proxy_url,
                height: embed.image_height,
                width: embed.image_width
            },
            thumbnail: {
                url: embed.thumbnail_url,
                proxy_url: embed.thumbnail_proxy_url,
                height: embed.thumbnail_height,
                width: embed.thumbnail_width
            },
            video: {
                url: embed.video_url,
                proxy_url: embed.video_proxy_url,
                height: embed.video_height,
                width: embed.video_width
            },
            provider: {
                name: embed.provider_name,
                url: embed.provider_url
            },
            author: {
                name: embed.author_name,
                url: embed.author_url,
                icon_url: embed.author_icon_url,
                proxy_icon_url: embed.author_proxy_icon_url
            },
            fields: _fields
        } as EmbedStructureWithId;
    });

    return embeds;
}

// export async function postEmbed(embed: EmbedStructureWithId): Promise<{ message_id: string }> {}
