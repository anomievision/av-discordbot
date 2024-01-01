import { usePrismaClient } from "#utils";

async function closeDatabaseConnection(): Promise<{ status: "pass" | "fail", error?: string }> {
    const db = await usePrismaClient.$disconnect().then(() => {
        return { status: "pass" as const };
    }).catch((error: { message: string }) => {
        return { status: "fail" as const, error: error.message };
    });

    return db;
}

// TODO: Add logger
export async function useExitTasks(): Promise<void> {
    const db = await closeDatabaseConnection();
    if (db.status === "fail")
        throw new Error(db.error);
}
