import { useLogger, usePrismaClient } from "#utils";

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
    const db = await usePrismaClient.$connect().then(() => {
        return { status: "pass" as const };
    }).catch((error: { message: string }) => {
        return { status: "fail" as const, error: error.message };
    });

    await useLogger("info", "startup", "Connected to database");

    return db;
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
