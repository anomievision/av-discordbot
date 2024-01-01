import { useLogger } from "#utils";
import type { Event } from "@lilybird/handlers";

export default {
    event: "ready",
    run: async (client) => {
        await useLogger("info", "listener", `Logged in as ${client.user.username}`);
    }
} satisfies Event<"ready">;
