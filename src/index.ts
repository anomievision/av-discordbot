import { exitTasks } from "./checks/exit.js";
import { startupTasks } from "./checks/startup.js";
import { startClient } from "./client.js";

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

await startupTasks();
await startClient();

process.on("SIGINT", async () => {
    console.log("Stopping bot...");
    await exitTasks();

    process.exit(0);
});
