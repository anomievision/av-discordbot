import { useLogger, useSupabaseServiceClient } from "#utils";

async function checkEnvs(): Promise<{ status: "pass" | "fail", error?: string }> {
    const envs = Object.keys(process.env);
    const unsetEnvs = envs.filter((env) => process.env[env] === undefined);
    if (unsetEnvs.length > 0) {
        return {
            status: "fail",
            error: `Required environment variables are not set: ${unsetEnvs.join(", ")}`
        };
    }

    await useLogger("info", "startup", "All required environment variables are set");

    return { status: "pass" };
}

async function checkDatabaseConnection(): Promise<{ status: "pass" | "fail", error?: string }> {
    const { error } = await useSupabaseServiceClient()
        .schema("discord")
        .from("log")
        .select("id");

    if (error !== null) {
        return {
            status: "fail",
            error: "Failed to connect to database"
        };
    }

    await useLogger("info", "startup", "Connected to database");

    return { status: "pass" };
}

export async function useStartupTasks(): Promise<void> {
    const envs = await checkEnvs();
    if (envs.status === "fail")
        throw new Error(envs.error);

    const db = await checkDatabaseConnection();
    if (db.status === "fail")
        throw new Error(db.error);

    await useLogger("info", "startup", "Startup tasks completed");
}
