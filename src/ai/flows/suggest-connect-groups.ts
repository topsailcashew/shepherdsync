'use server';

/**
 * @fileOverview Suggests connect groups for disconnected members using generative AI.
 *
 * - suggestConnectGroups - A function that suggests connect groups for disconnected members.
 * - SuggestConnectGroupsInput - The input type for the suggestConnectGroups function.
 * - SuggestConnectGroupsOutput - The return type for the suggestConnectGroups function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestConnectGroupsInputSchema = z.object({
  memberData: z
    .string()
    .describe('Data about the disconnected member, including interests, age, and family status.'),
  availableGroups: z
    .string()
    .describe('A list of available connect groups with descriptions of their focus and demographics.'),
});
export type SuggestConnectGroupsInput = z.infer<typeof SuggestConnectGroupsInputSchema>;

const SuggestConnectGroupsOutputSchema = z.object({
  suggestedGroups: z
    .string()
    .describe('A list of suggested connect groups for the member, based on their data and the group descriptions.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the group suggestions, explaining why each group is a good fit for the member.'),
});
export type SuggestConnectGroupsOutput = z.infer<typeof SuggestConnectGroupsOutputSchema>;

export async function suggestConnectGroups(input: SuggestConnectGroupsInput): Promise<SuggestConnectGroupsOutput> {
  return suggestConnectGroupsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestConnectGroupsPrompt',
  input: {schema: SuggestConnectGroupsInputSchema},
  output: {schema: SuggestConnectGroupsOutputSchema},
  prompt: `You are a church administrator with expertise in connecting members to appropriate connect groups.

  Based on the following member data and available groups, suggest the best connect groups for the member and explain your reasoning.

  Member Data: {{{memberData}}}
  Available Groups: {{{availableGroups}}}

  Your suggestions should be tailored to the member's interests, age, and family status, and should explain why each group is a good fit.
  Format the suggestedGroups as a comma separated list.
  `,
});

const suggestConnectGroupsFlow = ai.defineFlow(
  {
    name: 'suggestConnectGroupsFlow',
    inputSchema: SuggestConnectGroupsInputSchema,
    outputSchema: SuggestConnectGroupsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
