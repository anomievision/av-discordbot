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
        name,
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
                name,
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
        .returns<Database.SelectEmbed>()
        .limit(1)
        .single();

    if (error) {
        await useLogger("error", "query::embed::create", "Failed to create embed in database");
        return error.message;
    }

    await useLogger("info", "query::embed::create", "Created embed in database");

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
        name,
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
            name,
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
        .returns<Database.SelectEmbed>()
        .limit(1)
        .single();

    if (error) {
        await useLogger("error", "query::embed::update", "Failed to update embed in database");
        return error.message;
    }

    await useLogger("info", "query::embed::update", "Updated embed in database");

    return useSnakeToCamelCase(data);
}

export async function useQueryDeleteEmbed(channelId: string, {
    messageId,
    name
}: {
    messageId?: string,
    name?: string
}): Promise<boolean> {
    const { error } = channelId && messageId
        ? await useSupabaseServiceClient()
            .schema("discord")
            .from("embed")
            .delete()
            .eq("channel_id", channelId)
            .eq("message_id", messageId)
        : channelId && name
            ? await useSupabaseServiceClient()
                .schema("discord")
                .from("embed")
                .delete()
                .eq("channel_id", channelId)
                .eq("name", name)
            : await useSupabaseServiceClient()
                .schema("discord")
                .from("embed")
                .delete()
                .eq("channel_id", channelId);

    if (error) {
        await useLogger("error", "query::embed::delete", "Failed to delete embed from database");
        return false;
    }

    return true;
}

export async function useQuerySelectEmbed(channelId: string, {
    messageId,
    name
}: {
    messageId?: string,
    name?: string
}): Promise<SelectEmbed | string> {
    if (!messageId && !name) throw new Error("Either messageId or name must be provided");

    const { data, error } = channelId && messageId
        ? await useSupabaseServiceClient()
            .schema("discord")
            .from("embed")
            .select()
            .eq("channel_id", channelId)
            .eq("message_id", messageId)
            .returns<Database.SelectEmbed>()
            .limit(1)
            .single()
        : channelId && name
            ? await useSupabaseServiceClient()
                .schema("discord")
                .from("embed")
                .select()
                .eq("channel_id", channelId)
                .eq("name", name)
                .returns<Database.SelectEmbed>()
                .limit(1)
                .single()
            : await useSupabaseServiceClient()
                .schema("discord")
                .from("embed")
                .select()
                .eq("channel_id", channelId)
                .returns<Database.SelectEmbed>()
                .limit(1)
                .single();

    if (error) {
        await useLogger("error", "query::embed::select", "Failed to get embed from database");
        return error.message;
    }

    await useLogger("info", "query::embed::select", "Got embed from database");

    return useSnakeToCamelCase(data);
}

export async function useQuerySelectEmbeds(): Promise<Array<SelectEmbed> | []> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("embed")
        .select()
        .returns<Array<Database.SelectEmbed>>();

    if (error) {
        await useLogger("error", "query::embed::select", "Failed to get embeds from database");
        return [];
    }

    await useLogger("info", "query::embed::select", "Got embeds from database");

    return useSnakeToCamelCase(data);
}
