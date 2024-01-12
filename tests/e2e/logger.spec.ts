import { useLogger } from "#utils";
import { describe, test } from "bun:test";

describe(
    "Bot",
    () => {
        test(
            "logger",
            async () => {
                await useLogger("log", "startup", "Creating client...");
                await new Promise((resolve) => { setTimeout(resolve, 500); });
                await useLogger("debug", "lock:create", "Debugging client...");
                await new Promise((resolve) => { setTimeout(resolve, 500); });
                await useLogger("info", "listeners", "Logged in as Anom");
                await new Promise((resolve) => { setTimeout(resolve, 500); });
                await useLogger("warn", "discord", "This is a warning!");
                await new Promise((resolve) => { setTimeout(resolve, 500); });
                await useLogger("error", "query::embed::select", "This is an error!");
                await new Promise((resolve) => { setTimeout(resolve, 500); });
                await useLogger("error", "query::embed::select", "This is an error!", JSON.stringify({ name: "Anomie" }));
            }
        );
    }
);
