import { labelIds } from "./ids.js";

export function getIdsFromLabels(labels: Array<Support.Ticket.Label>): Array<string> {
    return labels.map((label) => labelIds[label]);
}

export function getIdFromPriority(priority: Support.Ticket.Priority): number {
    switch (priority) {
        case "none":
            return 0;
        case "urgent":
            return 1;
        case "high":
            return 2;
        case "medium":
            return 3;
        case "low":
            return 4;
    }
}
