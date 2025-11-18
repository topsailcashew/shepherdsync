'use server';

import { suggestConnectGroups } from '@/ai/flows/suggest-connect-groups';
import type { SuggestConnectGroupsOutput } from '@/ai/flows/suggest-connect-groups';
import { z } from 'zod';

const schema = z.object({
  memberId: z.string(),
  memberData: z.string(),
  availableGroups: z.string(),
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
    memberData: formData.get('memberData'),
    availableGroups: formData.get('availableGroups'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid request data.',
      error: true,
    };
  }

  try {
    const result = await suggestConnectGroups({
      memberData: validatedFields.data.memberData,
      availableGroups: validatedFields.data.availableGroups,
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
