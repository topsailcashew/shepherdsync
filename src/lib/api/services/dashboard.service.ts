import { apiClient } from '../client';
import { DashboardStats } from '../types';

export class DashboardService {
  async getStats(): Promise<DashboardStats> {
    // The Shepherd backend doesn't have a dedicated stats endpoint,
    // so we'll aggregate data from multiple endpoints
    const [members, unconnected, groups] = await Promise.all([
      apiClient.get<any>('/members?limit=1'),
      apiClient.get<any[]>('/members/unconnected'),
      apiClient.get<any>('/connect-groups?limit=1'),
    ]);

    // Get member growth data for the last 6 months
    const memberGrowth = await this.getMemberGrowth();

    return {
      totalMembers: members.meta?.total || 0,
      activeMembers: members.meta?.total || 0, // TODO: Filter by active status
      unconnectedMembers: unconnected.length || 0,
      activeGroups: groups.meta?.total || 0,
      covenantPartners: 0, // TODO: Add endpoint or filter
      memberGrowth,
    };
  }

  private async getMemberGrowth(): Promise<{ month: string; count: number }[]> {
    // This would ideally come from an analytics endpoint
    // For now, return placeholder structure
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, i) => ({
      month,
      count: 0, // TODO: Get actual data from backend
    }));
  }
}

export const dashboardService = new DashboardService();
