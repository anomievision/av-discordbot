import { useLogger } from "#utils";
import { generateHeapSnapshot } from "bun";
import { parseUsing24BitColors } from "tasai";

function scheduleHeapSnapshot(interval: number): void {
    setInterval(async function () {
        const time = new Date().getTime();
        const snapshot = generateHeapSnapshot();

        await Bun.write(`snapshots/snapshot-${time}.json`, JSON.stringify(snapshot, null, 2));

        await useLogger("info", "scheduled", "Captured heap snapshot");
    }, interval);
}

function scheduleMemoryUsageUpdates(interval: number): void {
    let lastMemoryUsage = 0;

    setInterval(async function () {
        const memoryUsage = process.memoryUsage();
        const currentMemoryUsage = Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100;
        const difference = currentMemoryUsage - lastMemoryUsage;
        const sign = difference > 0 ? "+" : "-";
        const styledDifference = difference > 0 ? `<#FA5A6A>${sign} ${difference.toFixed(2)} MB<r>` : `<#59E37B>${sign} ${difference.toFixed(2)} MB<r>`;

        // eslint-disable-next-line require-atomic-updates
        lastMemoryUsage = currentMemoryUsage;

        await useLogger("info", "scheduled", `Memory usage: ${currentMemoryUsage} MB | ${parseUsing24BitColors(styledDifference)}`);
    }, interval);
}

export async function useScheduledTasks(): Promise<void> {
    await useLogger("info", "scheduled", "Starting scheduled tasks");

    scheduleHeapSnapshot(3 * 60 * 60 * 1000);

    scheduleMemoryUsageUpdates(10 * 60 * 1000);
}
