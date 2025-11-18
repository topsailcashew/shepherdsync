'use client';

import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { columns } from './components/columns';
import { members } from './data/seed';

export default function UnconnectedPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Unconnected Members"
        description="Find members who aren't in a connect group and help them get involved."
      />

      <DataTable columns={columns} data={members} />
    </div>
  );
}
