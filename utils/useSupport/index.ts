import { linear } from "./client.js";
import { teamId } from "./ids.js";
import { getIdsFromLabels, getIdFromPriority } from "./utils.js";
import { useError, useLogger } from "@utils";

export async function useSupportTicket({
    discordId,
    discordUsername,
    email = "N/A",
    phone = "N/A",
    title,
    message,
    labels,
    priority
}: Support.Ticket): Promise<{ data: Support.Ticket.Response | null, error?: string }> {
    try {
        const _description = `From: ${discordUsername} <DiscordId: ${discordId} | Email: ${email} | Phone: ${phone}> \n\n ${message}`;

        const _issue = await linear.createIssue({
            teamId,
            title,
            description: _description, // Main context
            labelIds: getIdsFromLabels(labels),
            priority: getIdFromPriority(priority)
        });

        if (!_issue.success)
            await useLogger("error", "discord::support::ticket", "Issue was not created");

        const issue: Support.Ticket.Response = {
            referenceId: (await _issue.issue)?.id,
            success: true
        };

        return { data: issue, error: undefined };
    } catch (error) {
        await useLogger("error", "discord::support::ticket", JSON.stringify(error));
        return { data: null, error: useError(error) };
    }
}
