import { watch } from "node:fs";
import { rm } from "node:fs/promises";
import type { FSWatcher } from "node:fs";

const PID_FILE = `${import.meta.dir}/pid`;
const WATCH_DIR = `${import.meta.dir}/src`;

async function start(): Promise<void> {
    const proc = Bun.spawn(["bun", "start"]);

    console.log(`Started bot with pid ${proc.pid}`);

    await Bun.write("pid", proc.pid.toString());
}

async function stop(): Promise<void> {
    const pid = await Bun.file("pid").text();

    console.log(`Stopping bot with pid ${pid}`);

    process.kill(parseInt(pid));
}

async function restart(): Promise<void> {
    await stop();
    await new Promise((resolve) => { setTimeout(resolve, 1000); });
    await start();
}

async function startWatcher(): Promise<FSWatcher> {
    console.log(`Starting watcher on dir: ${WATCH_DIR}...`);

    await start();

    return watch(
        WATCH_DIR,
        { recursive: true },
        async (event, filename) => {
            console.log(`Detected ${event} in ${filename}`);
            await restart();
        }
    );
}

const watcher = await startWatcher();

process.on("SIGINT", async () => {
    console.log("Stopping watcher...");
    watcher.close();

    await rm(PID_FILE);

    process.exit(0);
});
