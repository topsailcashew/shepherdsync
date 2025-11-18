export type Member = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'Active' | 'Inactive' | 'Pending';
  roles: string[];
  engagement: number;
  age: number;
  familyStatus: string;
  interests: string[];
  covenant: boolean;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  members: number;
};
