import { useLogger } from "#utils";
import { rm } from "node:fs/promises";

const LOCK_FILE = `${process.cwd()}/run.lock`;

export async function useCreateLock(): Promise<void> {
    try {
        const lock: Lockfile = {
            started: new Date().toISOString()
        };

        await Bun.write(LOCK_FILE, JSON.stringify(lock));

        await useLogger("info", "lock:create", `Created lockfile at ${LOCK_FILE}`);
    } catch (error: unknown) {
        const _error = `Unable to create lockfile at ${LOCK_FILE}`;

        await useLogger("error", "lock:create", _error);

        throw new Error(_error);
    }
}

export async function useRemoveLock(): Promise<void> {
    try {
        await rm(LOCK_FILE);

        await useLogger("info", "lock:remove", `Removed lockfile at ${LOCK_FILE}`);
    } catch (error: unknown) {
        const _error = `Unable to remove lockfile at ${LOCK_FILE}`;

        await useLogger("error", "lock:remove", _error);

        throw new Error(_error);
    }
}

export async function useLock(): Promise<Lockfile> {
    try {
        const lock = await Bun.file(LOCK_FILE).json() as Lockfile;

        await useLogger("info", "lock:use", `Using lockfile at ${LOCK_FILE}`);

        return lock;
    } catch (error: unknown) {
        const _error = `Unable to load lockfile at ${LOCK_FILE}`;

        await useLogger("error", "lock:use", _error);

        throw new Error(_error);
    }
}
