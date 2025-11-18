# Developer Quick Reference Guide

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server (port 9002)
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Common Tasks

### Adding a New Page

1. **Create the page file**
```tsx
// src/app/(main)/new-page/page.tsx
'use client';

import { PageHeader } from '@/components/page-header';

export default function NewPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="New Feature"
        description="Description of the feature"
      />
      {/* Your content */}
    </div>
  );
}
```

2. **Add to navigation**
```tsx
// src/components/main-nav.tsx
{
  name: 'New Feature',
  href: '/new-page',
  icon: YourIcon,
  disabled: false,
}
```

### Fetching Data from API

```tsx
import { useQuery } from '@tanstack/react-query';
import { membersService } from '@/lib/api';

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['members'],
    queryFn: () => membersService.getMembers({ page: 1, limit: 100 }),
  });

  if (isLoading) return <Loader2 className="animate-spin" />;
  if (error) return <div>Error loading data</div>;

  return <div>{/* Use data */}</div>;
}
```

### Creating a New API Service

1. **Add types**
```tsx
// src/lib/api/types.ts
export interface MyResource {
  id: string;
  name: string;
  // ...
}
```

2. **Create service**
```tsx
// src/lib/api/services/myresource.service.ts
import { apiClient } from '../client';
import type { MyResource } from '../types';

export class MyResourceService {
  async getAll(): Promise<MyResource[]> {
    return apiClient.get<MyResource[]>('/my-resources');
  }

  async getById(id: string): Promise<MyResource> {
    return apiClient.get<MyResource>(`/my-resources/${id}`);
  }

  async create(data: CreateMyResourceRequest): Promise<MyResource> {
    return apiClient.post<MyResource>('/my-resources', data);
  }
}

export const myResourceService = new MyResourceService();
```

3. **Export from index**
```tsx
// src/lib/api/index.ts
export { myResourceService, MyResourceService } from './services/myresource.service';
```

### Using Permissions

```tsx
import { usePermissions } from '@/hooks/use-permissions';

function ProtectedComponent() {
  const { hasPermission, hasMinimumRole } = usePermissions();

  // Check single permission
  if (!hasPermission('members:write')) {
    return <div>Access Denied</div>;
  }

  // Check minimum role
  if (!hasMinimumRole('ADMIN_STAFF')) {
    return <div>Insufficient privileges</div>;
  }

  return <div>{/* Protected content */}</div>;
}
```

### Creating Forms

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
});

type FormValues = z.infer<typeof formSchema>;

function MyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // API call
      await membersService.create(data);
      // Success handling
    } catch (error) {
      // Error handling
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* More fields */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Mutations (Create/Update/Delete)

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { membersService } from '@/lib/api';

function MyComponent() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreateMemberRequest) => membersService.create(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['members'] });
      // Show toast
      toast({ title: 'Member created successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const handleCreate = () => {
    createMutation.mutate({ firstName: 'John', lastName: 'Doe' });
  };

  return <Button onClick={handleCreate}>Create Member</Button>;
}
```

### Using Dialogs

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        {/* Dialog content */}
      </DialogContent>
    </Dialog>
  );
}
```

### Error Handling Pattern

```tsx
function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load data. {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <div>{/* Render data */}</div>;
}
```

### Toast Notifications

```tsx
import { useToast } from '@/hooks/use-toast';

function MyComponent() {
  const { toast } = useToast();

  const showSuccess = () => {
    toast({
      title: 'Success',
      description: 'Operation completed successfully',
    });
  };

  const showError = () => {
    toast({
      title: 'Error',
      description: 'Something went wrong',
      variant: 'destructive',
    });
  };

  return <Button onClick={showSuccess}>Show Toast</Button>;
}
```

## File Structure Guide

```
src/
├── app/
│   ├── (main)/                 # Protected routes (requires auth)
│   │   ├── layout.tsx          # Main layout with sidebar
│   │   └── page-name/          # Feature pages
│   │       ├── page.tsx        # Page component
│   │       ├── components/     # Page-specific components
│   │       └── data/           # Page-specific schemas
│   ├── login/                  # Public route
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
│
├── components/
│   ├── ui/                     # shadcn/ui components (don't edit)
│   ├── data-table.tsx          # Reusable components
│   └── page-header.tsx
│
├── contexts/
│   └── auth-context.tsx        # Global state contexts
│
├── hooks/
│   ├── use-permissions.ts      # Custom hooks
│   └── use-toast.ts
│
├── lib/
│   ├── api/                    # API layer
│   │   ├── client.ts           # Axios client
│   │   ├── types.ts            # TypeScript types
│   │   └── services/           # API services
│   └── utils.ts                # Utility functions
│
└── providers/
    └── query-provider.tsx      # App providers
```

## Styling Guide

### Using Tailwind Classes
```tsx
<div className="flex items-center gap-4 p-6 bg-background border rounded-lg">
  <h1 className="text-2xl font-bold">Title</h1>
</div>
```

### Using cn() for Conditional Classes
```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  isActive && "active-class",
  isError && "error-class"
)}>
  Content
</div>
```

### Theme Colors
```tsx
// Use CSS variables
bg-background     // Main background
bg-primary        // Primary color
bg-secondary      // Secondary color
bg-accent         // Accent color
bg-muted          // Muted backgrounds
text-foreground   // Main text
text-muted-foreground // Muted text
border            // Border color
```

## Component Patterns

### Loading State
```tsx
{isLoading ? (
  <Skeleton className="h-8 w-32" />
) : (
  <div>{data}</div>
)}
```

### Empty State
```tsx
{data.length === 0 ? (
  <div className="text-center py-12 text-muted-foreground">
    No items found
  </div>
) : (
  <div>{/* List items */}</div>
)}
```

### Data Table
```tsx
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

<DataTable columns={columns} data={data} />
```

## API Client Usage

### Direct API Calls (without React Query)
```tsx
import { membersService } from '@/lib/api';

async function doSomething() {
  try {
    const members = await membersService.getMembers({ page: 1, limit: 10 });
    console.log(members);
  } catch (error) {
    console.error('API Error:', error);
  }
}
```

### Handling API Errors
```tsx
try {
  await membersService.create(data);
} catch (error: any) {
  if (error.statusCode === 400) {
    // Validation error
  } else if (error.statusCode === 401) {
    // Unauthorized (handled automatically by client)
  } else if (error.statusCode === 0) {
    // Network error
  }
}
```

## Environment Variables

### Accessing in Code
```tsx
// Client-side (must start with NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server-side (any name)
const secret = process.env.SECRET_KEY;
```

### Available Variables
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_API_TIMEOUT` - Request timeout (ms)
- `GEMINI_API_KEY` - Google Gemini API key

## Testing the App

### Manual Testing Checklist

1. **Start backend**
```bash
cd shepherd-backend
npm run docker:up
npm run start:dev
```

2. **Start frontend**
```bash
npm run dev
```

3. **Test login**
- Go to http://localhost:9002
- Should redirect to /login
- Login with `admin@church.org` / `Admin123!`
- Should redirect to /dashboard

4. **Test navigation**
- Click Dashboard, Members, Unconnected
- Verify data loads from API

### Debugging Tips

**Check if backend is running:**
```bash
curl http://localhost:3000/api/auth/me
```

**Check browser console for errors**
- Open DevTools (F12)
- Look for red errors
- Check Network tab for failed requests

**Check localStorage for tokens**
```javascript
// In browser console
localStorage.getItem('shepherd_auth_token')
localStorage.getItem('shepherd_refresh_token')
```

**Clear cache and tokens**
```javascript
// In browser console
localStorage.clear()
location.reload()
```

## Common Issues

### "Failed to load members"
- Backend not running
- Wrong API URL in `.env`
- CORS not configured on backend

### "Unauthorized" redirect loop
- Invalid JWT secret on backend
- Token expired and refresh failed
- Clear localStorage and login again

### Types not matching
- Backend schema changed
- Update `src/lib/api/types.ts`
- Run `npm run typecheck`

### Styles not applying
- Restart dev server
- Check for Tailwind class typos
- Ensure `globals.css` is imported

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [TanStack Query Docs](https://tanstack.com/query)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zod Docs](https://zod.dev/)

---

**Happy Coding!** 🚀
