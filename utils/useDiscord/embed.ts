import { useError, useLogger } from "#utils";
import type { REST } from "lilybird/rest";
import type { EmbedStructure } from "lilybird";

export async function useDiscordCreateEmbed(rest: REST, channelId: string, embed: EmbedStructure): Promise<{ data: any, error?: string }> {
    try {
        const message = await rest.createMessage(channelId, {
            embeds: [
                {
                    title: embed.title,
                    description: embed.description,
                    url: embed.url,
                    timestamp: embed.timestamp,
                    color: embed.color,
                    footer: embed.footer
                        ? {
                            text: embed.footer.text,
                            icon_url: embed.footer.icon_url,
                            proxy_icon_url: embed.footer.proxy_icon_url
                        }
                        : undefined,
                    image: embed.image
                        ? {
                            url: embed.image.url,
                            proxy_url: embed.image.proxy_url,
                            height: embed.image.height,
                            width: embed.image.width
                        }
                        : undefined,
                    thumbnail: embed.thumbnail
                        ? {
                            url: embed.thumbnail.url,
                            proxy_url: embed.thumbnail.proxy_url,
                            height: embed.thumbnail.height,
                            width: embed.thumbnail.width
                        }
                        : undefined,
                    video: embed.video
                        ? {
                            url: embed.video.url,
                            proxy_url: embed.video.proxy_url,
                            height: embed.video.height,
                            width: embed.video.width
                        }
                        : undefined,
                    provider: embed.provider
                        ? {
                            name: embed.provider.name,
                            url: embed.provider.url
                        }
                        : undefined
                }
            ]
        });

        return {
            data: message,
            error: undefined
        };
    } catch (error: unknown) {
        const _error = useError(error);

        await useLogger("error", "useDiscordCreateEmbed", _error);

        return {
            data: undefined,
            error: _error
        };
    }
}

export async function useDiscordUpdateEmbed(rest: REST, channelId: string, messageId: string, embed: EmbedStructure): Promise<{ data: any, error?: string }> {
    try {
        const message = await rest.editMessage(channelId, messageId, {
            embeds: [
                {
                    title: embed.title,
                    description: embed.description,
                    url: embed.url,
                    timestamp: embed.timestamp,
                    color: embed.color,
                    footer: embed.footer
                        ? {
                            text: embed.footer.text,
                            icon_url: embed.footer.icon_url,
                            proxy_icon_url: embed.footer.proxy_icon_url
                        }
                        : undefined,
                    image: embed.image
                        ? {
                            url: embed.image.url,
                            proxy_url: embed.image.proxy_url,
                            height: embed.image.height,
                            width: embed.image.width
                        }
                        : undefined,
                    thumbnail: embed.thumbnail
                        ? {
                            url: embed.thumbnail.url,
                            proxy_url: embed.thumbnail.proxy_url,
                            height: embed.thumbnail.height,
                            width: embed.thumbnail.width
                        }
                        : undefined,
                    video: embed.video
                        ? {
                            url: embed.video.url,
                            proxy_url: embed.video.proxy_url,
                            height: embed.video.height,
                            width: embed.video.width
                        }
                        : undefined,
                    provider: embed.provider
                        ? {
                            name: embed.provider.name,
                            url: embed.provider.url
                        }
                        : undefined
                }
            ]
        });

        return {
            data: message,
            error: undefined
        };
    } catch (error: unknown) {
        const _error = useError(error);

        await useLogger("error", "useDiscordUpdateEmbed", _error);

        return {
            data: undefined,
            error: _error
        };
    }
}

export async function useDiscordDeleteEmbed(rest: REST, channelId: string, messageId: string): Promise<{ data: boolean, error?: string }> {
    try {
        await rest.deleteMessage(channelId, messageId);

        return {
            data: true,
            error: undefined
        };
    } catch (error: unknown) {
        const _error = useError(error);

        await useLogger("error", "useDiscordCreateEmbed", _error);

        return {
            data: false,
            error: _error
        };
    }
}

export async function doesDiscordEmbedExist(rest: REST, channelId: string, messageId: string): Promise<boolean> {
    try {
        await rest.getChannelMessage(channelId, messageId);

        return true;
    } catch {
        return false;
    }
}
