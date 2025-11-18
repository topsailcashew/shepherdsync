// Export API client
export { apiClient } from './client';
export type { ApiError } from './client';

// Export types
export * from './types';

// Export services
export { authService, AuthService } from './services/auth.service';
export { membersService, MembersService } from './services/members.service';
export { groupsService, GroupsService } from './services/groups.service';
export { dashboardService, DashboardService } from './services/dashboard.service';

export type {
  CreateConnectGroupRequest,
  UpdateConnectGroupRequest,
} from './services/groups.service';
