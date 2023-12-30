import { readableStreamToText } from "bun";
import { watch } from "node:fs";
import { mkdir, rm } from "node:fs/promises";

const PID_FILE = `${import.meta.dir}/pid`;
const WATCH_DIR = `${import.meta.dir}/src`;

// ---------------------------------------------------

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

async function startWatcher(): Promise<void> {
    console.log(`Starting watcher on dir: ${WATCH_DIR}...`);

    await start();

    const watcher = watch(
        WATCH_DIR,
        { recursive: true },
        async (event, filename) => {
            console.log(`Detected ${event} in ${filename}`);
            await restart();
        }
    );

    process.on("SIGINT", async () => {
        console.log("Stopping watcher...");
        watcher.close();

        await rm(PID_FILE);

        process.exit(0);
    });
}

// ---------------------------------------------------

async function generateMigrations(): Promise<void> {
    const targetMigrationDir = "database/migrations/20230000000000_init_discord";

    await rm(targetMigrationDir, { recursive: true, force: true });
    await mkdir(targetMigrationDir, { recursive: true });

    const { stdout, stderr } = Bun.spawn([
        "bunx",
        "prisma",
        "migrate",
        "diff",
        "--from-empty",
        "--to-schema-datamodel",
        "database/schema.prisma",
        "--script"
    ]);

    const output = await readableStreamToText(stdout);
    await Bun.write("database/migrations/20230000000000_init_discord/migration.sql", output);

    console.log("Generated initial migration");
}

// ---------------------------------------------------

(async () => {
    if (process.argv.length > 2) {
        switch (process.argv[2]) {
            case "-w":
            case "--watch":
                await startWatcher();
                break;
            case "-g":
            case "--generate":
                await generateMigrations();
                break;
            default:
                console.log("Invalid argument");
                break;
        }
    }
})();
