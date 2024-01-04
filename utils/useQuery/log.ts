import { useLogger, useSnakeToCamelCase, useSupabaseServiceClient } from "#utils";

export async function useQueryCreateLog({
    category,
    level,
    message,
    context
}: InsertLog): Promise<SelectLog | string> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("log")
        .insert({
            timestamp: new Date().getTime().toString(),
            category,
            level,
            message,
            context
        })
        .select()
        .returns<Database.SelectLog>()
        .limit(1)
        .single();

    if (error) {
        await useLogger("error", "query::log::create", "Failed to create log in database");
        return error.message;
    }

    await useLogger("info", "query::log::create", "Created log in database");

    return useSnakeToCamelCase(data);
}

export async function useQueryUpdateLog(id: string, {
    category,
    level,
    message,
    context
}: UpdateLog): Promise<SelectLog | string> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("log")
        .update({
            category,
            level,
            message,
            context
        })
        .eq("id", id)
        .select()
        .returns<Database.SelectLog>()
        .limit(1)
        .single();

    if (error) {
        await useLogger("error", "query::log::update", "Failed to update log in database");
        return error.message;
    }

    await useLogger("info", "query::log::update", "Updated log in database");

    return useSnakeToCamelCase(data);
}

export async function useQueryDeleteLog(id: string): Promise<boolean> {
    const { error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("log")
        .delete()
        .eq("id", id);

    if (error) {
        await useLogger("error", "query::log::delete", "Failed to delete log from database");
        return false;
    }

    return true;
}

export async function useQuerySelectLog(id: string): Promise<SelectLog | string> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("log")
        .select()
        .eq("id", id)
        .returns<Database.SelectLog>()
        .limit(1)
        .single();

    if (error) {
        await useLogger("error", "query::log::select", "Failed to select log from database");
        return error.message;
    }

    await useLogger("info", "query::log::select", "Selected log from database");

    return useSnakeToCamelCase(data);
}

export async function useQuerySelectLogs(amount: number = 10): Promise<Array<SelectLog> | string> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("log")
        .select()
        .order("timestamp", { ascending: false })
        .limit(amount)
        .returns<Array<Database.SelectLog>>();

    if (error) {
        await useLogger("error", "query::log::select", "Failed to select logs from database");
        return error.message;
    }

    await useLogger("info", "query::log::select", "Selected logs from database");

    return useSnakeToCamelCase(data);
}
