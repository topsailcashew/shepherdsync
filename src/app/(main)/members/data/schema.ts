import { z } from 'zod';
import {
  MemberStatus,
  MembershipStatus,
  Gender,
  MaritalStatus,
  EngagementLevel
} from '@/lib/api';

export const memberSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  maritalStatus: z.nativeEnum(MaritalStatus).optional(),
  status: z.nativeEnum(MemberStatus),
  membershipStatus: z.nativeEnum(MembershipStatus),
  profilePictureUrl: z.string().url().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  joinDate: z.string().optional(),
  baptismDate: z.string().optional(),
  notes: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  occupation: z.string().optional(),
  employer: z.string().optional(),
  interests: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  engagementLevel: z.nativeEnum(EngagementLevel),
  lastAttendance: z.string().optional(),
  householdId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().optional(),
});

export type Member = z.infer<typeof memberSchema>;
