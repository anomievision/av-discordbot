import { prismaClient } from "@database";

function checkEnvs(): { status: "pass" | "fail", error?: string } {
    const envs = Object.keys(process.env);
    const unsetEnvs = envs.filter((env) => process.env[env] === undefined);
    if (unsetEnvs.length > 0) {
        return {
            status: "fail",
            error: `Required environment variables are not set: ${unsetEnvs.join(", ")}`
        };
    }

    return { status: "pass" };
}

async function checkDatabaseConnection(): Promise<{ status: "pass" | "fail", error?: string }> {
    const db = await prismaClient.$connect().then(() => {
        return { status: "pass" as const };
    }).catch((error: { message: string }) => {
        return { status: "fail" as const, error: error.message };
    });

    return db;
}

// TODO: Add logger
export async function startupTasks(): Promise<void> {
    const envs = checkEnvs();
    if (envs.status === "fail")
        throw new Error(envs.error);

    const db = await checkDatabaseConnection();
    if (db.status === "fail")
        throw new Error(db.error);
}
