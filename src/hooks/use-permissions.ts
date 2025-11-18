'use client';

import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/lib/api';

export type Permission =
  | 'members:read'
  | 'members:write'
  | 'members:delete'
  | 'children:read'
  | 'children:write'
  | 'groups:read'
  | 'groups:write'
  | 'groups:manage'
  | 'teams:read'
  | 'teams:write'
  | 'teams:manage'
  | 'ministries:read'
  | 'ministries:write'
  | 'partnership:read'
  | 'partnership:write'
  | 'audit:read'
  | 'users:manage'
  | 'settings:manage';

// Role hierarchy (higher roles inherit permissions from lower roles)
const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.SUPER_ADMIN]: 5,
  [UserRole.PASTORAL_STAFF]: 4,
  [UserRole.ADMIN_STAFF]: 3,
  [UserRole.CONNECT_GROUP_LEADER]: 2,
  [UserRole.SERVING_TEAM_LEADER]: 1,
};

// Permission mapping by role
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: [
    'members:read',
    'members:write',
    'members:delete',
    'children:read',
    'children:write',
    'groups:read',
    'groups:write',
    'groups:manage',
    'teams:read',
    'teams:write',
    'teams:manage',
    'ministries:read',
    'ministries:write',
    'partnership:read',
    'partnership:write',
    'audit:read',
    'users:manage',
    'settings:manage',
  ],
  [UserRole.PASTORAL_STAFF]: [
    'members:read',
    'members:write',
    'members:delete',
    'children:read',
    'children:write',
    'groups:read',
    'groups:write',
    'groups:manage',
    'teams:read',
    'teams:write',
    'teams:manage',
    'ministries:read',
    'ministries:write',
    'partnership:read',
    'partnership:write',
    'audit:read',
  ],
  [UserRole.ADMIN_STAFF]: [
    'members:read',
    'members:write',
    'children:read',
    'children:write',
    'groups:read',
    'groups:write',
    'teams:read',
    'teams:write',
    'ministries:read',
    'ministries:write',
    'partnership:read',
    'partnership:write',
  ],
  [UserRole.CONNECT_GROUP_LEADER]: [
    'members:read',
    'groups:read',
    'groups:write', // Only for their group
    'teams:read',
  ],
  [UserRole.SERVING_TEAM_LEADER]: [
    'members:read',
    'groups:read',
    'teams:read',
    'teams:write', // Only for their team
  ],
};

export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role]?.includes(permission) || false;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some((permission) => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every((permission) => hasPermission(permission));
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  const hasMinimumRole = (role: UserRole): boolean => {
    if (!user) return false;
    return ROLE_HIERARCHY[user.role] >= ROLE_HIERARCHY[role];
  };

  const canAccessChildren = (): boolean => {
    // Children data requires special two-person access rule
    // This is a simplified check - actual implementation would need
    // to verify another staff member is present
    return hasPermission('children:read');
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasMinimumRole,
    canAccessChildren,
    userRole: user?.role,
  };
}

export function useRequirePermission(permission: Permission) {
  const { hasPermission } = usePermissions();
  const canAccess = hasPermission(permission);

  return { canAccess };
}

export function useRequireRole(role: UserRole) {
  const { hasMinimumRole } = usePermissions();
  const canAccess = hasMinimumRole(role);

  return { canAccess };
}
