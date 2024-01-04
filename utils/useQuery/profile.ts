import { useLogger, useSnakeToCamelCase, useSupabaseServiceClient } from "#utils";

export async function useQuerySelectProfile({
    discordId,
    username
}: {
    discordId?: string,
    username?: string
}): Promise<SelectProfile | string> {
    if (!discordId && !username) throw new Error("Either discordId or username must be provided");

    // TODO: Need to make sure database is up-to-date for this functionality
    const { data, error } = discordId
        ? await useSupabaseServiceClient()
            .schema("discord")
            .from("user")
            .select()
            .eq("id", discordId)
            .returns<Database.SelectProfile>()
            .limit(1)
            .single()
        : username
            ? await useSupabaseServiceClient()
                .schema("public")
                .from("profile")
                .select()
                .eq("username", username)
                .returns<Database.SelectProfile>()
                .limit(1)
                .single()
            : await useSupabaseServiceClient()
                .schema("discord")
                .from("profile")
                .select()
                .returns<Database.SelectProfile>()
                .limit(1)
                .single();

    if (error) {
        await useLogger("error", "query::profile::get", "Failed to get profile from database");
        return error.message;
    }

    return useSnakeToCamelCase(data);
}
