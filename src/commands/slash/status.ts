
import { getCpuUsage, getMemoryUsage, getUptime, getVersion, useLogger } from "#utils";
import { ApplicationCommandType } from "lilybird";
import type { EmbedStructure } from "lilybird";
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
            color: 0x2b2d31,
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

        await interaction.reply({ embeds: [embed], ephemeral: true });

        await useLogger(
            "info",
            "command::interaction",
            `Guild: ${interaction.data.guildId} | Channel: ${interaction.data.targetId} | User: ${interaction.message} | Command: /${interaction.data.name}`
        );
    }
} satisfies SlashCommand;
