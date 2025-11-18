'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableRowActions } from './data-table-row-actions';
import type { Member } from '../data/schema';

export const columns: ColumnDef<Member>[] = [
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Member
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          className={cn(
            status === 'ACTIVE' && 'bg-green-100 text-green-800',
            status === 'INACTIVE' && 'bg-red-100 text-red-800',
            status === 'PROSPECT' && 'bg-yellow-100 text-yellow-800',
            status === 'DECEASED' && 'bg-gray-100 text-gray-800'
          )}
        >
          {status.replace('_', ' ')}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'membershipStatus',
    header: 'Membership',
    cell: ({ row }) => {
      const status = row.getValue('membershipStatus') as string;
      return (
        <Badge variant="secondary">
          {status.replace(/_/g, ' ')}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'engagementLevel',
    header: 'Engagement',
    cell: ({ row }) => {
      const level = row.getValue('engagementLevel') as string;
      const levelMap = {
        NONE: { value: 0, color: 'bg-gray-200' },
        LOW: { value: 25, color: 'bg-yellow-200' },
        MEDIUM: { value: 60, color: 'bg-blue-200' },
        HIGH: { value: 90, color: 'bg-green-200' },
      };
      const engagement = levelMap[level as keyof typeof levelMap] || levelMap.NONE;

      return (
        <div className="flex items-center gap-2">
          <Progress value={engagement.value} className={cn('h-2 w-24', engagement.color)} />
          <span className="text-sm text-muted-foreground">{level}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
