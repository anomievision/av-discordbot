import { useLogger } from "#utils";
import { rm } from "node:fs/promises";

const LOCK_FILE = `${process.cwd()}/run.lock`;

export async function createLock(): Promise<void> {
    const lock: Lockfile = {
        started: new Date().toISOString()
    };

    await Bun.write(LOCK_FILE, JSON.stringify(lock));

    await useLogger("info", "lock", `Created lockfile at ${LOCK_FILE}`);
}

export async function removeLock(): Promise<void> {
    await rm(LOCK_FILE);

    await useLogger("info", "lock", `Removed lockfile at ${LOCK_FILE}`);
}

export async function useLock(): Promise<Lockfile> {
    const lock = await Bun.file(LOCK_FILE).json() as Lockfile;

    await useLogger("info", "lock", `Using lockfile at ${LOCK_FILE}`);

    return lock;
}
