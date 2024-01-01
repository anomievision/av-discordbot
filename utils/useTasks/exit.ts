import { useLogger, usePrismaClient } from "#utils";

async function closeDatabaseConnection(): Promise<{ status: "pass" | "fail", error?: string }> {
    const db = await usePrismaClient.$disconnect().then(() => {
        return { status: "pass" as const };
    }).catch((error: { message: string }) => {
        return { status: "fail" as const, error: error.message };
    });

    await useLogger("info", "exit", "Closed database connection");

    return db;
}

export async function useExitTasks(): Promise<void> {
    const db = await closeDatabaseConnection();
    if (db.status === "fail")
        throw new Error(db.error);

    await useLogger("info", "exit", "Exiting process");
}
