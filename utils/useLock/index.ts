import { rm } from "node:fs/promises";

const LOCK_FILE = `${process.cwd()}/run.lock`;

// TODO: Add logger
export async function createLock(): Promise<void> {
    const lock: Lockfile = {
        started: new Date().toISOString()
    };

    await Bun.write(LOCK_FILE, JSON.stringify(lock));
}

// TODO: Add logger
export async function removeLock(): Promise<void> {
    await rm(LOCK_FILE);
}

// TODO: Add logger
export async function useLock(): Promise<Lockfile> {
    const lock = await Bun.file(LOCK_FILE).json() as Lockfile;

    return lock;
}
