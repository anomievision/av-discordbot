import { ApplicationCommandType } from "lilybird";
import type { EmbedStructure } from "lilybird";

export default {
    post: "GLOBAL",
    data: {
        type: ApplicationCommandType.CHAT_INPUT,
        name: "ping",
        description: "Get the bot's ping."
    },
    run: async (interaction) => {
        await interaction.deferReply(true);

        const { ws, rest } = await interaction.client.ping();

        const embed: EmbedStructure = {
            color: 0x2b2d31,
            description: `🏓 WebSocket: \`${ws}ms\` | Rest: \`${rest}ms\``
        };

        await interaction.editReply({
            embeds: [embed]
        });
    }
} satisfies Handlers.SlashCommand;
