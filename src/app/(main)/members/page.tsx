'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { columns } from './components/columns';
import { DataTableToolbar } from './components/data-table-toolbar';
import { useQuery } from '@tanstack/react-query';
import { membersService } from '@/lib/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function MembersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['members'],
    queryFn: () => membersService.getMembers({ page: 1, limit: 100 }),
  });

  if (error) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Member Management"
          description="View, search, and manage all members of your community."
        />
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load members. Please make sure the Shepherd backend is running.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Member Management"
        description="View, search, and manage all members of your community."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </PageHeader>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data?.data || []}
          toolbar={<DataTableToolbar table={null as any} />}
        />
      )}
    </div>
  );
}
