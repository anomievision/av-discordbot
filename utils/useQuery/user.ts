import { useLogger, useSnakeToCamelCase, useSupabaseServiceClient } from "#utils";

export async function useQueryCreateUser(id: string): Promise<SelectUser | string> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("user")
        .insert([ { id } ])
        .returns<Database.SelectUser>()
        .limit(1)
        .single();

    if (error) {
        await useLogger("error", "query::user::create", "Failed to create user in database");
        return error.message;
    }

    return useSnakeToCamelCase(data);
}

export async function useQueryUpdateUser(id: string): Promise<SelectUser | string> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("user")
        .update({ id })
        .eq("id", id)
        .returns<Database.SelectUser>()
        .limit(1)
        .single();

    if (error) {
        await useLogger("error", "query::user::update", "Failed to update user in database");
        return error.message;
    }

    await useLogger("info", "query::user::update", "Updated user in database");

    return useSnakeToCamelCase(data);
}

export async function useQueryDeleteUser(id: string): Promise<boolean> {
    const { error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("user")
        .delete()
        .eq("id", id);

    if (error) {
        await useLogger("error", "query::user::delete", "Failed to delete user from database");
        return false;
    }

    return true;
}

export async function useQuerySelectUser(id: string): Promise<SelectUser | string> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("user")
        .select()
        .eq("id", id)
        .limit(1)
        .single();

    if (error) {
        await useLogger("error", "query::user::select", "Failed to select user from database");
        return error.message;
    }

    return useSnakeToCamelCase(data);
}

export async function useQuerySelectUsers(): Promise<Array<SelectUser> | []> {
    const { data, error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("user")
        .select();

    if (error) {
        await useLogger("error", "query::user::select", "Failed to select users from database");
        return [];
    }

    return useSnakeToCamelCase(data);
}
