// Shepherd Backend API Types

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  PASTORAL_STAFF = 'PASTORAL_STAFF',
  ADMIN_STAFF = 'ADMIN_STAFF',
  CONNECT_GROUP_LEADER = 'CONNECT_GROUP_LEADER',
  SERVING_TEAM_LEADER = 'SERVING_TEAM_LEADER',
}

export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PROSPECT = 'PROSPECT',
  DECEASED = 'DECEASED',
}

export enum MembershipStatus {
  GUEST = 'GUEST',
  REGULAR_ATTENDER = 'REGULAR_ATTENDER',
  COVENANT_PARTNER = 'COVENANT_PARTNER',
  FORMER_MEMBER = 'FORMER_MEMBER',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
  SEPARATED = 'SEPARATED',
}

export enum EngagementLevel {
  NONE = 'NONE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  mfaEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: Gender;
  maritalStatus?: MaritalStatus;
  status: MemberStatus;
  membershipStatus: MembershipStatus;
  profilePictureUrl?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  joinDate?: string;
  baptismDate?: string;
  notes?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  occupation?: string;
  employer?: string;
  interests?: string[];
  skills?: string[];
  engagementLevel: EngagementLevel;
  lastAttendance?: string;
  householdId?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;

  // Relations (when included)
  household?: Household;
  connectGroups?: ConnectGroupMember[];
  servingTeams?: ServingTeamMember[];
  covenantPartnership?: CovenantPartnership;
  engagementMetrics?: EngagementSummary;
}

export interface Household {
  id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
  members?: Member[];
}

export interface ConnectGroup {
  id: string;
  name: string;
  description?: string;
  meetingDay?: string;
  meetingTime?: string;
  location?: string;
  isActive: boolean;
  capacity?: number;
  leaderId?: string;
  createdAt: string;
  updatedAt: string;
  leader?: Member;
  members?: ConnectGroupMember[];
}

export interface ConnectGroupMember {
  memberId: string;
  connectGroupId: string;
  joinedAt: string;
  leftAt?: string;
  member?: Member;
  connectGroup?: ConnectGroup;
}

export interface ServingTeam {
  id: string;
  name: string;
  description?: string;
  department?: string;
  isActive: boolean;
  leaderId?: string;
  createdAt: string;
  updatedAt: string;
  leader?: Member;
  members?: ServingTeamMember[];
}

export interface ServingTeamMember {
  memberId: string;
  servingTeamId: string;
  role?: string;
  joinedAt: string;
  leftAt?: string;
  member?: Member;
  servingTeam?: ServingTeam;
}

export interface MinistryProgram {
  id: string;
  name: string;
  description?: string;
  category?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CovenantPartnership {
  id: string;
  memberId: string;
  commitmentDate: string;
  completionDate?: string;
  classAttended: boolean;
  interviewCompleted: boolean;
  publicCommitment: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  member?: Member;
}

export interface EngagementSummary {
  memberId: string;
  totalAttendances: number;
  lastAttendance?: string;
  attendanceStreak: number;
  connectGroupCount: number;
  servingTeamCount: number;
  ministryProgramCount: number;
  totalContributions: number;
  lastContribution?: string;
  engagementScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  allergies?: string[];
  medicalInfo?: string;
  specialNeeds?: string;
  householdId?: string;
  createdAt: string;
  updatedAt: string;
  household?: Household;
  parentRelationships?: ParentChildRelationship[];
  checkIns?: CheckIn[];
}

export interface ParentChildRelationship {
  parentId: string;
  childId: string;
  relationshipType: string;
  isPrimaryContact: boolean;
  hasPickupPermission: boolean;
  hasCustody: boolean;
  createdAt: string;
  parent?: Member;
  child?: Child;
}

export interface CheckIn {
  id: string;
  childId: string;
  eventId?: string;
  checkInTime: string;
  checkOutTime?: string;
  checkedInBy: string;
  checkedOutBy?: string;
  notes?: string;
  securityCode?: string;
  createdAt: string;
  child?: Child;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  changes?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  user?: User;
}

// API Request/Response Types

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface PaginatedRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MembersFilterRequest extends PaginatedRequest {
  search?: string;
  status?: MemberStatus;
  membershipStatus?: MembershipStatus;
  engagementLevel?: EngagementLevel;
  hasConnectGroup?: boolean;
  hasServingTeam?: boolean;
  isCovenantPartner?: boolean;
}

export interface CreateMemberRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: Gender;
  maritalStatus?: MaritalStatus;
  status?: MemberStatus;
  membershipStatus?: MembershipStatus;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  joinDate?: string;
  baptismDate?: string;
  notes?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  occupation?: string;
  employer?: string;
  interests?: string[];
  skills?: string[];
  householdId?: string;
}

export interface UpdateMemberRequest extends Partial<CreateMemberRequest> {}

export interface EngagementDashboard {
  overview: {
    totalAttendances: number;
    lastAttendance?: string;
    attendanceStreak: number;
    engagementScore: number;
  };
  connectGroups: {
    current: ConnectGroup[];
    past: ConnectGroup[];
  };
  servingTeams: {
    current: ServingTeam[];
    past: ServingTeam[];
  };
  ministryPrograms: MinistryProgram[];
  contributions: {
    total: number;
    lastDate?: string;
    frequency: string;
  };
  milestones: {
    joinDate?: string;
    baptismDate?: string;
    covenantPartnerDate?: string;
  };
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  unconnectedMembers: number;
  activeGroups: number;
  covenantPartners: number;
  memberGrowth: {
    month: string;
    count: number;
  }[];
}
