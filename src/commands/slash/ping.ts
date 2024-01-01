import { ApplicationCommandType } from "lilybird";
import type { EmbedStructure, EmbedType } from "lilybird";
import type { SlashCommand } from "@lilybird/handlers";

// TODO: Add logger
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
            type: "rich" as EmbedType,
            color: 2829617,
            description: `🏓 WebSocket: \`${ws}ms\` | Rest: \`${rest}ms\``
        };

        await interaction.editReply({
            embeds: [embed]
        });
    }
} satisfies SlashCommand;
