'use client';

import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { columns } from './components/columns';
import { useQuery } from '@tanstack/react-query';
import { membersService } from '@/lib/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function UnconnectedPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['unconnected-members'],
    queryFn: () => membersService.getUnconnectedMembers(),
  });

  if (error) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Unconnected Members"
          description="Find members who aren't in a connect group and help them get involved."
        />
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load unconnected members. Please make sure the Shepherd backend is running.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Unconnected Members"
        description="Find members who aren't in a connect group and help them get involved."
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <DataTable columns={columns} data={data || []} />
      )}
    </div>
  );
}
