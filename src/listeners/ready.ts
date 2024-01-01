import { useLogger } from "#utils";
import type { Event } from "@lilybird/handlers";

export default {
    event: "ready",
    run: async (client) => {
        await useLogger("info", "listener::ready", `Logged in as ${client.user.username}`);
    }
} satisfies Event<"ready">;
