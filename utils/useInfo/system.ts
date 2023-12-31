import { useLock } from "@utils";
import { cpus } from "node:os";

export function getCpuUsage(): string {
    const [cpu] = cpus();
    const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
    const usage = process.cpuUsage();
    const currentCpuUsage = (usage.user + usage.system) / 1000;
    const percentage = currentCpuUsage / total * 100;

    return `${percentage.toFixed(2)}%`;
}

export function getMemoryUsage(): string {
    const { heapUsed, heapTotal } = process.memoryUsage();
    const percentage = Math.round((heapUsed / heapTotal) * 100);
    return `${percentage.toFixed(2)}%`;
}

export async function getUptime(): Promise<string> {
    const lock = await useLock();
    const uptime = lock.started;

    const started = new Date(uptime).getTime();
    const now = new Date().getTime();
    const difference = now - started;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}
