import { z } from 'zod';

export const unconnectedMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().url(),
  age: z.number(),
  familyStatus: z.string(),
  interests: z.array(z.string()),
  joined: z.date(),
});

export type UnconnectedMember = z.infer<typeof unconnectedMemberSchema>;

export const connectGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export type ConnectGroup = z.infer<typeof connectGroupSchema>;
