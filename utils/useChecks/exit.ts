import { prismaClient } from "@database";

async function closeDatabaseConnection(): Promise<{ status: "pass" | "fail", error?: string }> {
    const db = await prismaClient.$disconnect().then(() => {
        return { status: "pass" as const };
    }).catch((error: { message: string }) => {
        return { status: "fail" as const, error: error.message };
    });

    return db;
}

// TODO: Add logger
export async function useExitChecks(): Promise<void> {
    const db = await closeDatabaseConnection();
    if (db.status === "fail")
        throw new Error(db.error);
}
