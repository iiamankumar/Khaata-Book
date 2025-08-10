
'use server';

/**
 * @fileOverview A support ticket creation and auto-response flow.
 *
 * - createSupportTicket - A function that handles creating a support ticket.
 * - CreateSupportTicketInput - The input type for the createSupportTicket function.
 * - CreateSupportTicketOutput - The return type for the createSupportTicket function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CreateSupportTicketInputSchema = z.object({
  subject: z.string().describe('The subject of the support ticket.'),
  category: z.enum(["billing", "technical", "general"]).describe('The category of the support ticket.'),
  message: z.string().describe('The user\'s message for the support ticket.'),
});
export type CreateSupportTicketInput = z.infer<typeof CreateSupportTicketInputSchema>;

const CreateSupportTicketOutputSchema = z.object({
  ticketId: z.string().describe('A unique ID for the created ticket.'),
  message: z.string().describe('A helpful auto-response to the user.'),
});
export type CreateSupportTicketOutput = z.infer<typeof CreateSupportTicketOutputSchema>;

export async function createSupportTicket(input: CreateSupportTicketInput): Promise<CreateSupportTicketOutput> {
  return supportTicketFlow(input);
}

const prompt = ai.definePrompt({
  name: 'supportTicketPrompt',
  input: { schema: CreateSupportTicketInputSchema },
  output: { schema: CreateSupportTicketOutputSchema },
  prompt: `You are a helpful customer support agent for a student finance app called KhaataBook.
  A user has submitted a support ticket.
  Your tasks are:
  1.  Generate a unique ticket ID. It should be a random 6-digit alphanumeric string (e.g., AB12CD).
  2.  Write a friendly and helpful response to the user. Acknowledge their issue and let them know the team will get back to them within 24-48 hours.

  Ticket Details:
  - Category: {{{category}}}
  - Subject: {{{subject}}}
  - Message: {{{message}}}
  `,
});

const supportTicketFlow = ai.defineFlow(
  {
    name: 'supportTicketFlow',
    inputSchema: CreateSupportTicketInputSchema,
    outputSchema: CreateSupportTicketOutputSchema,
  },
  async input => {
    // In a real app, you would save the ticket to a database here.
    // We are generating a random ID and response for demonstration.
    const { output } = await prompt(input);
    return output!;
  }
);
