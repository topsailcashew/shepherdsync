import { z } from 'zod';

export const memberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().url(),
  status: z.enum(['Active', 'Inactive', 'Pending']),
  roles: z.array(z.string()),
  engagement: z.number(),
  covenant: z.boolean(),
});

export type Member = z.infer<typeof memberSchema>;
