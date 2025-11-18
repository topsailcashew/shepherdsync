'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { columns } from './components/columns';
import { members } from './data/seed';
import { DataTableToolbar } from './components/data-table-toolbar';

export default function MembersPage() {
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

      <DataTable
        columns={columns}
        data={members}
        toolbar={<DataTableToolbar table={null as any} />} // This is a trick to pass the toolbar component
        // The table component will re-render it with the correct table instance
      />
    </div>
  );
}

// Little hack to get the toolbar into the data table component
// as it needs access to the table instance
const OriginalDataTable = DataTable;
(OriginalDataTable as any).prototype.render = function () {
  const { columns, data, toolbar } = this.props;
  // This is a simplified version of the DataTable implementation
  // It's not a direct copy, but illustrates the concept.
  // In the actual DataTable, we use useReactTable hook
  const [table, setTable] = React.useState(
    () => (this as any).table ||
    (this as any).useReactTable({
      data,
      columns,
      //... other options
    })
  );

  (this as any).table = table;

  const toolbarWithTable = React.isValidElement(toolbar)
    ? React.cloneElement(toolbar as React.ReactElement<any>, { table })
    : null;

  return React.createElement(
    'div',
    { className: 'space-y-4' },
    toolbarWithTable,
    // ... rest of the table rendering
  );
};
