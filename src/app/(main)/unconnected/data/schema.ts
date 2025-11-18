import { z } from 'zod';
import { memberSchema } from '../../members/data/schema';

// Unconnected members use the same schema as regular members
export const unconnectedMemberSchema = memberSchema;

export type UnconnectedMember = z.infer<typeof unconnectedMemberSchema>;

export const connectGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  meetingDay: z.string().optional(),
  meetingTime: z.string().optional(),
  location: z.string().optional(),
  isActive: z.boolean(),
  capacity: z.number().optional(),
  leaderId: z.string().optional(),
});

export type ConnectGroup = z.infer<typeof connectGroupSchema>;
