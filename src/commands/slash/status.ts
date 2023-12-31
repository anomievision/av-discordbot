
import { getCpuUsage, getMemoryUsage, getUptime, getVersion } from "@utils";
import { ApplicationCommandType } from "lilybird";
import type { EmbedStructure, EmbedType } from "lilybird";
import type { SlashCommand } from "@lilybird/handlers";

// TODO: Add logger
export default {
    post: "GLOBAL",
    data: {
        type: ApplicationCommandType.CHAT_INPUT,
        name: "status",
        description: "Get the status of the bot"
    },
    run: async (interaction) => {
        const embed: EmbedStructure = {
            title: "Status",
            type: "rich" as EmbedType,
            color: 2829617,
            description: "",
            fields: [
                {
                    name: "Uptime",
                    value: await getUptime()
                },
                {
                    name: "Version",
                    value: await getVersion()
                },
                {
                    name: "CPU Usage",
                    value: getCpuUsage()
                },
                {
                    name: "Memory Usage",
                    value: getMemoryUsage()
                }
            ]
        };

        await interaction.deferReply(true);

        await interaction.editReply({ embeds: [embed] });
    }
} satisfies SlashCommand;
