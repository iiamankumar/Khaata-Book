
"use server";

import { createSupportTicket as createTicket, CreateSupportTicketInput } from "@/ai/flows/support-ticket-flow";

export async function createSupportTicket(input: CreateSupportTicketInput) {
  try {
    const result = await createTicket(input);
    return result;
  } catch (error) {
    console.error("Error creating support ticket:", error);
    return { ticketId: "", message: "" };
  }
}
