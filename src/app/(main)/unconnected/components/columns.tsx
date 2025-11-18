'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { SuggestGroupsAction } from './suggest-groups-action';
import type { UnconnectedMember } from '../data/schema';

export const columns: ColumnDef<UnconnectedMember>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Member',
    cell: ({ row }) => {
      const member = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person portrait"/>
            <AvatarFallback>
              {member.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{member.name}</span>
            <span className="text-sm text-muted-foreground">{member.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'interests',
    header: 'Interests',
    cell: ({ row }) => {
      const interests = row.getValue('interests') as string[];
      return (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {interests.map((interest) => (
            <Badge key={interest} variant="secondary">
              {interest}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'familyStatus',
    header: 'Family Status',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'joined',
    header: 'Joined Date',
    cell: ({ row }) => {
      return format(row.getValue('joined'), 'MMM d, yyyy');
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <SuggestGroupsAction member={row.original} />,
  },
];
