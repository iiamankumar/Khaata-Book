'use server';

/**
 * @fileOverview Personalized saving tips for students based on their spending habits.
 *
 * - getPersonalizedSavingTips - A function that generates personalized saving tips.
 * - PersonalizedSavingTipsInput - The input type for the getPersonalizedSavingTips function.
 * - PersonalizedSavingTipsOutput - The return type for the getPersonalizedSavingTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedSavingTipsInputSchema = z.object({
  spendingHabits: z
    .string()
    .describe('Description of the user spending habits.'),
});
export type PersonalizedSavingTipsInput = z.infer<typeof PersonalizedSavingTipsInputSchema>;

const PersonalizedSavingTipsOutputSchema = z.object({
  tips: z.string().describe('Personalized tips for saving money.'),
});
export type PersonalizedSavingTipsOutput = z.infer<typeof PersonalizedSavingTipsOutputSchema>;

export async function getPersonalizedSavingTips(
  input: PersonalizedSavingTipsInput
): Promise<PersonalizedSavingTipsOutput> {
  return personalizedSavingTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedSavingTipsPrompt',
  input: {schema: PersonalizedSavingTipsInputSchema},
  output: {schema: PersonalizedSavingTipsOutputSchema},
  prompt: `You are a financial advisor for college students.

  Based on the spending habits of the student, provide personalized tips on how to save money.

  Spending habits: {{{spendingHabits}}}
  `,
});

const personalizedSavingTipsFlow = ai.defineFlow(
  {
    name: 'personalizedSavingTipsFlow',
    inputSchema: PersonalizedSavingTipsInputSchema,
    outputSchema: PersonalizedSavingTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
