import type { UnconnectedMember, ConnectGroup } from './schema';

export const members: UnconnectedMember[] = [
  {
    id: 'MEM-101',
    name: 'Chris Rogers',
    email: 'chris.r@example.com',
    avatar: 'https://picsum.photos/seed/11/200/200',
    age: 28,
    familyStatus: 'Single',
    interests: ['Hiking', 'Technology', 'Music'],
    joined: new Date('2023-11-15'),
  },
  {
    id: 'MEM-102',
    name: 'Patricia King',
    email: 'pat.k@example.com',
    avatar: 'https://picsum.photos/seed/12/200/200',
    age: 45,
    familyStatus: 'Married with young children',
    interests: ['Parenting', 'Crafting', 'Reading'],
    joined: new Date('2024-01-20'),
  },
  {
    id: 'MEM-103',
    name: 'Daniel Wright',
    email: 'dan.w@example.com',
    avatar: 'https://picsum.photos/seed/13/200/200',
    age: 62,
    familyStatus: 'Empty Nester',
    interests: ['Gardening', 'History', 'Volunteering'],
    joined: new Date('2023-09-01'),
  },
  {
    id: 'MEM-104',
    name: 'Megan Hill',
    email: 'megan.h@example.com',
    avatar: 'https://picsum.photos/seed/14/200/200',
    age: 24,
    familyStatus: 'In a relationship',
    interests: ['Art', 'Coffee', 'Social Justice'],
    joined: new Date('2024-03-10'),
  },
];

export const connectGroups: ConnectGroup[] = [
  {
    id: 'GRP-01',
    name: 'Young Professionals',
    description: 'A group for 20s-30s navigating career and faith.',
  },
  {
    id: 'GRP-02',
    name: 'Parents of Littles',
    description: 'Support and community for families with children under 10.',
  },
  {
    id: 'GRP-03',
    name: 'Prime Timers',
    description: 'Fellowship for ages 55+ through social events and study.',
  },
  {
    id: 'GRP-04',
    name: 'Creative Community',
    description: 'For artists, writers, and makers to explore faith and creativity.',
  },
  {
    id: 'GRP-05',
    name: 'Men\'s Fraternity',
    description: 'A group for men to build authentic friendships and grow in faith.',
  },
  {
    id: 'GRP-06',
    name: 'Women of the Word',
    description: 'A women\'s group focused on in-depth Bible study.',
  },
];
