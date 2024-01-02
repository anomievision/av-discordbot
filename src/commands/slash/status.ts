
import { useCpuUsage, useMemoryUsage, useUptime, useVersion, useLogger } from "#utils";
import { ApplicationCommandType } from "lilybird";
import type { EmbedStructure } from "lilybird";
import type { SlashCommand } from "@lilybird/handlers";

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
                    value: await useUptime()
                },
                {
                    name: "Version",
                    value: await useVersion()
                },
                {
                    name: "CPU Usage",
                    value: useCpuUsage()
                },
                {
                    name: "Memory Usage",
                    value: useMemoryUsage()
                }
            ]
        };

        await interaction.reply({ embeds: [embed], ephemeral: true });

        if (interaction.inGuild()) {
            await useLogger(
                "info",
                "command::interaction",
                `Guild: ${interaction.guildId} | Channel: ${interaction.channelId} | User: ${interaction.member.user.id} | Command: /${interaction.data.name}`
            );
        }
    }
} satisfies SlashCommand;
