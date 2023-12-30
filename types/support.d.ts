declare global {
  namespace Support {
    type Ticket = {
      discordId: string;
      discordUsername: string;
      email?: string | null;
      phone?: string | null;
      name: string;
      title: string;
      message: string;
      labels: Support.Ticket.Label[];
      priority: Support.Ticket.Priority;
    };

    namespace Ticket {
      type Label = "bug" | "feature" | "improvement";

      type Priority = "none" | "urgent" | "high" | "medium" | "low";

      type Response = {
        referenceId?: string;
        success: boolean;
      };
    }
  }
}

export {};
