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
    id: 'name',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: 'Member',
    cell: ({ row }) => {
      const member = row.original;
      const fullName = `${member.firstName} ${member.lastName}`;
      const initials = `${member.firstName[0]}${member.lastName[0]}`.toUpperCase();
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            {member.profilePictureUrl && (
              <AvatarImage
                src={member.profilePictureUrl}
                alt={fullName}
                data-ai-hint="person portrait"
              />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{fullName}</span>
            <span className="text-sm text-muted-foreground">{member.email || 'No email'}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'interests',
    header: 'Interests',
    cell: ({ row }) => {
      const interests = (row.getValue('interests') as string[]) || [];
      if (interests.length === 0) {
        return <span className="text-sm text-muted-foreground">No interests listed</span>;
      }
      return (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {interests.slice(0, 3).map((interest) => (
            <Badge key={interest} variant="secondary">
              {interest}
            </Badge>
          ))}
          {interests.length > 3 && (
            <Badge variant="outline">+{interests.length - 3}</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'maritalStatus',
    header: 'Family Status',
    cell: ({ row }) => {
      const status = row.getValue('maritalStatus') as string;
      return status ? status.replace(/_/g, ' ') : '-';
    },
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Age',
    cell: ({ row }) => {
      const dob = row.getValue('dateOfBirth') as string;
      if (!dob) return '-';
      const age = Math.floor((Date.now() - new Date(dob).getTime()) / 31557600000);
      return age;
    },
  },
  {
    accessorKey: 'joinDate',
    header: 'Joined Date',
    cell: ({ row }) => {
      const date = row.getValue('joinDate') as string;
      return date ? format(new Date(date), 'MMM d, yyyy') : '-';
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <SuggestGroupsAction member={row.original} />,
  },
];
