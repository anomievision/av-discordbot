import { useError, useLogger } from "#utils";
import { rm } from "node:fs/promises";

const LOCK_FILE = `${process.cwd()}/run.lock`;

export async function useCreateLock(): Promise<void> {
    try {
        const lock: Lockfile = {
            started: new Date().toISOString()
        };

        await Bun.write(LOCK_FILE, JSON.stringify(lock));

        await useLogger("info", "lock", `Created lockfile at ${LOCK_FILE}`);
    } catch (error: unknown) {
        await useLogger("error", "lock", `Unable to create lockfile at ${LOCK_FILE}`);

        throw new Error(useError(error));
    }
}

export async function useRemoveLock(): Promise<void> {
    try {
        await rm(LOCK_FILE);

        await useLogger("info", "lock", `Removed lockfile at ${LOCK_FILE}`);
    } catch (error: unknown) {
        await useLogger("error", "lock", `Unable to remove lockfile at ${LOCK_FILE}`);

        throw new Error(useError(error));
    }
}

export async function useLock(): Promise<Lockfile> {
    try {
        const lock = await Bun.file(LOCK_FILE).json() as Lockfile;

        await useLogger("info", "lock", `Using lockfile at ${LOCK_FILE}`);

        return lock;
    } catch (error: unknown) {
        await useLogger("error", "lock", `Unable to load lockfile at ${LOCK_FILE}`);

        throw new Error(useError(error));
    }
}
