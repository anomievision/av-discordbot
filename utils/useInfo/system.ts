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