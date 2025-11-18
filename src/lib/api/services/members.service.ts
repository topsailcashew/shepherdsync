import { apiClient } from '../client';
import {
  Member,
  PaginatedResponse,
  MembersFilterRequest,
  CreateMemberRequest,
  UpdateMemberRequest,
  EngagementDashboard,
} from '../types';

export class MembersService {
  async getMembers(filters?: MembersFilterRequest): Promise<PaginatedResponse<Member>> {
    const params = new URLSearchParams();

    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.membershipStatus) params.append('membershipStatus', filters.membershipStatus);
    if (filters?.engagementLevel) params.append('engagementLevel', filters.engagementLevel);
    if (filters?.hasConnectGroup !== undefined) {
      params.append('hasConnectGroup', filters.hasConnectGroup.toString());
    }
    if (filters?.hasServingTeam !== undefined) {
      params.append('hasServingTeam', filters.hasServingTeam.toString());
    }
    if (filters?.isCovenantPartner !== undefined) {
      params.append('isCovenantPartner', filters.isCovenantPartner.toString());
    }

    const queryString = params.toString();
    const url = `/members${queryString ? `?${queryString}` : ''}`;

    return apiClient.get<PaginatedResponse<Member>>(url);
  }

  async getMemberById(id: string): Promise<Member> {
    return apiClient.get<Member>(`/members/${id}`);
  }

  async getUnconnectedMembers(): Promise<Member[]> {
    return apiClient.get<Member[]>('/members/unconnected');
  }

  async getMemberEngagement(id: string): Promise<EngagementDashboard> {
    return apiClient.get<EngagementDashboard>(`/members/${id}/engagement`);
  }

  async createMember(data: CreateMemberRequest): Promise<Member> {
    return apiClient.post<Member>('/members', data);
  }

  async updateMember(id: string, data: UpdateMemberRequest): Promise<Member> {
    return apiClient.patch<Member>(`/members/${id}`, data);
  }

  async deleteMember(id: string): Promise<void> {
    await apiClient.delete(`/members/${id}`);
  }
}

export const membersService = new MembersService();
