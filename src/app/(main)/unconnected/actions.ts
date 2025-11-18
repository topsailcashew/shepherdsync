'use server';

import { suggestConnectGroups } from '@/ai/flows/suggest-connect-groups';
import type { SuggestConnectGroupsOutput } from '@/ai/flows/suggest-connect-groups';
import { z } from 'zod';
import { members, connectGroups } from './data/seed';

const schema = z.object({
  memberId: z.string(),
});

export type FormState = {
  message: string;
  suggestion?: SuggestConnectGroupsOutput;
  error?: boolean;
};

export async function generateSuggestion(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

  const validatedFields = schema.safeParse({
    memberId: formData.get('memberId'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid member ID.',
      error: true,
    };
  }

  const member = members.find((m) => m.id === validatedFields.data.memberId);

  if (!member) {
    return {
      message: 'Member not found.',
      error: true,
    };
  }

  const memberData = `Name: ${member.name}, Age: ${
    member.age
  }, Interests: ${member.interests.join(', ')}, Family Status: ${
    member.familyStatus
  }`;
  const availableGroups = connectGroups
    .map((g) => `- ${g.name}: ${g.description}`)
    .join('\n');

  try {
    const result = await suggestConnectGroups({
      memberData,
      availableGroups,
    });
    return {
      message: 'Suggestions generated successfully.',
      suggestion: result,
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    console.error('AI suggestion error:', errorMessage);
    return {
      message: `Failed to generate suggestions. ${errorMessage}`,
      error: true,
    };
  }
}
