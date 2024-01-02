import { useLogger, useSnakeToCamelCase, useSupabaseServiceClient } from "#utils";

export async function useQueryCreateEmbed(
    channelId: string,
    {
        authorIconUrl,
        authorName,
        authorProxyIconUrl,
        authorUrl,
        color,
        createdAt,
        description,
        fields,
        footerIconUrl,
        footerProxyIconUrl,
        footerText,
        imageHeight,
        imageProxyUrl,
        imageUrl,
        imageWidth,
        providerName,
        providerUrl,
        thumbnailHeight,
        thumbnailProxyUrl,
        thumbnailUrl,
        thumbnailWidth,
        timestamp,
        title,
        updatedAt,
        url,
        videoHeight
    }: InsertEmbed
): Promise<SelectEmbed | string> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("embed")
        .insert([
            {

                author_icon_url: authorIconUrl,
                author_name: authorName,
                author_proxy_icon_url: authorProxyIconUrl,
                author_url: authorUrl,
                channel_id: channelId,
                color,
                created_at: createdAt,
                description,
                fields,
                footer_icon_url: footerIconUrl,
                footer_proxy_icon_url: footerProxyIconUrl,
                footer_text: footerText,
                image_height: imageHeight,
                image_proxy_url: imageProxyUrl,
                image_url: imageUrl,
                image_width: imageWidth,
                provider_name: providerName,
                provider_url: providerUrl,
                thumbnail_height: thumbnailHeight,
                thumbnail_proxy_url: thumbnailProxyUrl,
                thumbnail_url: thumbnailUrl,
                thumbnail_width: thumbnailWidth,
                timestamp,
                title,
                updated_at: updatedAt,
                url,
                video_height: videoHeight
            }
        ])
        .select()
        .returns<Database.SelectEmbed>();

    if (error) {
        await useLogger("error", "embed:create", "Failed to create embed in database");
        return error.message;
    }

    await useLogger("info", "embed:create", "Created embed in database");

    return useSnakeToCamelCase(data);
}

export async function useQueryUpdateEmbed(
    channelId: string,
    messageId: string,
    {
        authorIconUrl,
        authorName,
        authorProxyIconUrl,
        authorUrl,
        color,
        createdAt,
        description,
        fields,
        footerIconUrl,
        footerProxyIconUrl,
        footerText,
        imageHeight,
        imageProxyUrl,
        imageUrl,
        imageWidth,
        providerName,
        providerUrl,
        thumbnailHeight,
        thumbnailProxyUrl,
        thumbnailUrl,
        thumbnailWidth,
        timestamp,
        title,
        updatedAt,
        url,
        videoHeight
    }: UpdateEmbed
): Promise<SelectEmbed | string> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("embed")
        .update({
            author_icon_url: authorIconUrl,
            author_name: authorName,
            author_proxy_icon_url: authorProxyIconUrl,
            author_url: authorUrl,
            channel_id: channelId,
            color,
            created_at: createdAt,
            description,
            fields,
            footer_icon_url: footerIconUrl,
            footer_proxy_icon_url: footerProxyIconUrl,
            footer_text: footerText,
            image_height: imageHeight,
            image_proxy_url: imageProxyUrl,
            image_url: imageUrl,
            image_width: imageWidth,
            provider_name: providerName,
            provider_url: providerUrl,
            thumbnail_height: thumbnailHeight,
            thumbnail_proxy_url: thumbnailProxyUrl,
            thumbnail_url: thumbnailUrl,
            thumbnail_width: thumbnailWidth,
            timestamp,
            title,
            updated_at: updatedAt,
            url,
            video_height: videoHeight
        })
        .eq("channel_id", channelId)
        .eq("message_id", messageId)
        .select()
        .returns<Database.SelectEmbed>();

    if (error) {
        await useLogger("error", "embed:update", "Failed to update embed in database");
        return error.message;
    }

    await useLogger("info", "embed:update", "Updated embed in database");

    return useSnakeToCamelCase(data);
}

export async function useQueryDeleteEmbed(channelId: string, messageId: string): Promise<boolean> {
    const { error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("embed")
        .delete()
        .eq("channel_id", channelId)
        .eq("message_id", messageId);

    if (error) {
        await useLogger("error", "embed:delete", "Failed to delete embed from database");
        return false;
    }

    return true;
}

export async function useQueryGetEmbed(channelId: string, messageId: string): Promise<SelectEmbed | string> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("embed")
        .select()
        .eq("channel_id", channelId)
        .eq("message_id", messageId)
        .returns<Database.SelectEmbed>();

    if (error) {
        await useLogger("error", "embed:get", "Failed to get embed from database");
        return error.message;
    }

    await useLogger("info", "embed:get", "Got embed from database");

    return useSnakeToCamelCase(data);
}

export async function useQueryGetEmbeds(): Promise<Array<SelectEmbed> | []> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("embed")
        .select()
        .returns<Array<Database.SelectEmbed>>();

    if (error) {
        await useLogger("error", "embed:get", "Failed to get embeds from database");
        return [];
    }

    await useLogger("info", "embed:get", "Got embeds from database");

    return useSnakeToCamelCase(data);
}
