import { apiClient } from '../client';
import { ConnectGroup, PaginatedResponse, PaginatedRequest } from '../types';

export interface CreateConnectGroupRequest {
  name: string;
  description?: string;
  meetingDay?: string;
  meetingTime?: string;
  location?: string;
  capacity?: number;
  leaderId?: string;
}

export interface UpdateConnectGroupRequest extends Partial<CreateConnectGroupRequest> {
  isActive?: boolean;
}

export class GroupsService {
  async getGroups(filters?: PaginatedRequest): Promise<PaginatedResponse<ConnectGroup>> {
    const params = new URLSearchParams();

    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    const queryString = params.toString();
    const url = `/connect-groups${queryString ? `?${queryString}` : ''}`;

    return apiClient.get<PaginatedResponse<ConnectGroup>>(url);
  }

  async getGroupById(id: string): Promise<ConnectGroup> {
    return apiClient.get<ConnectGroup>(`/connect-groups/${id}`);
  }

  async createGroup(data: CreateConnectGroupRequest): Promise<ConnectGroup> {
    return apiClient.post<ConnectGroup>('/connect-groups', data);
  }

  async updateGroup(id: string, data: UpdateConnectGroupRequest): Promise<ConnectGroup> {
    return apiClient.patch<ConnectGroup>(`/connect-groups/${id}`, data);
  }

  async deleteGroup(id: string): Promise<void> {
    await apiClient.delete(`/connect-groups/${id}`);
  }

  async addMember(groupId: string, memberId: string): Promise<void> {
    await apiClient.post(`/connect-groups/${groupId}/members`, { memberId });
  }

  async removeMember(groupId: string, memberId: string): Promise<void> {
    await apiClient.delete(`/connect-groups/${groupId}/members/${memberId}`);
  }
}

export const groupsService = new GroupsService();
