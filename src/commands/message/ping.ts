import { useLogger } from "#utils";
import type { MessageCommand } from "@lilybird/handlers";

export default {
    name: "ping",
    run: async (message) => {
        const _message = await message.reply({
            content: "🏓..."
        });

        const { ws, rest } = await message.client.ping();

        await _message.edit({
            content: `🏓 WebSocket: \`${ws}ms\` | Rest: \`${rest}ms\``
        });

        await useLogger(
            "info",
            "command::message",
            `Guild: ${message.guildId} | Channel: ${message.channelId} | User: ${message.author.id} | Command: ${message.content}`
        );
    }
} satisfies MessageCommand;
