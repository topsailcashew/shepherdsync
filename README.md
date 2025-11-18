# ShepherdSync - Church Management Frontend

A modern, privacy-first frontend application for church administrative staff built with Next.js 15 and integrated with the [Shepherd Backend API](https://github.com/your-repo/shepherd-backend).

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Member Management**: Complete CRUD operations with pagination, sorting, and filtering
- **Dashboard**: Real-time statistics and member growth charts
- **Unconnected Members**: Track and help members connect to groups
- **AI-Powered Suggestions**: Group recommendations using Google Gemini AI
- **Responsive Design**: Beautiful UI built with Tailwind CSS and shadcn/ui
- **Type Safety**: Full TypeScript support with Zod validation

## Tech Stack

- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript 5.x
- **UI Library**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 3.4
- **Data Fetching**: TanStack React Query
- **API Client**: Axios
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **AI**: Google Gemini via Genkit

## Prerequisites

- Node.js 18+
- npm or yarn
- [Shepherd Backend](https://github.com/your-repo/shepherd-backend) running locally or remote

## Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd shepherdsync-frontend
npm install
```

### 2. Environment Setup

Copy and configure your environment variables:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
# Shepherd Backend Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TIMEOUT=30000

# Authentication
NEXT_PUBLIC_AUTH_TOKEN_KEY=shepherd_auth_token
NEXT_PUBLIC_REFRESH_TOKEN_KEY=shepherd_refresh_token

# AI Configuration (Optional - for group suggestions)
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Start Shepherd Backend

Make sure the Shepherd backend is running:

```bash
cd shepherd-backend
npm run docker:up
npm run start:dev
```

The backend should be running at `http://localhost:3000`

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:9002`

### 5. Login

Use the default credentials from the Shepherd backend:

- **Email**: `admin@church.org`
- **Password**: `Admin123!`

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Protected routes
│   │   ├── dashboard/            # Dashboard page
│   │   ├── members/              # Member management
│   │   └── unconnected/          # Unconnected members
│   ├── login/                    # Login page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── data-table.tsx            # Reusable data table
│   ├── main-nav.tsx              # Sidebar navigation
│   └── user-nav.tsx              # User dropdown
├── contexts/
│   └── auth-context.tsx          # Auth state management
├── hooks/
│   └── use-permissions.ts        # RBAC hooks
├── lib/
│   ├── api/                      # API client & services
│   │   ├── client.ts             # Axios client with interceptors
│   │   ├── types.ts              # TypeScript types from Shepherd
│   │   └── services/             # API service modules
│   │       ├── auth.service.ts
│   │       ├── members.service.ts
│   │       ├── groups.service.ts
│   │       └── dashboard.service.ts
│   └── utils.ts                  # Utility functions
└── providers/
    └── query-provider.tsx        # React Query provider

```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 9002)
npm run build            # Build for production
npm run start            # Start production server

# AI Development
npm run genkit:dev       # Start Genkit AI development server
npm run genkit:watch     # Start with watch mode

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # Check TypeScript types
```

## API Integration

The app integrates with the following Shepherd Backend endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Members
- `GET /api/members` - List members (with pagination/filters)
- `GET /api/members/:id` - Get member details
- `GET /api/members/unconnected` - Get unconnected members
- `POST /api/members` - Create member
- `PATCH /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member (soft delete)

### Groups
- `GET /api/connect-groups` - List connect groups
- `GET /api/connect-groups/:id` - Get group details

## Authentication Flow

1. User enters credentials on login page
2. Frontend sends `POST /api/auth/login`
3. Backend returns `accessToken` and `refreshToken`
4. Tokens stored in localStorage
5. `accessToken` added to all subsequent requests
6. On 401 error, automatic token refresh attempt
7. On refresh failure, redirect to login

## Role-Based Access Control

The app supports 5 user roles from Shepherd:

- **SUPER_ADMIN**: Full system access
- **PASTORAL_STAFF**: All ministry features + audit logs
- **ADMIN_STAFF**: Member management + groups/teams
- **CONNECT_GROUP_LEADER**: Limited to assigned groups
- **SERVING_TEAM_LEADER**: Limited to assigned teams

Use the `usePermissions()` hook to check permissions:

```tsx
import { usePermissions } from '@/hooks/use-permissions';

function MyComponent() {
  const { hasPermission, hasMinimumRole } = usePermissions();

  if (!hasPermission('members:write')) {
    return <div>Access Denied</div>;
  }

  // Component content
}
```

## Data Fetching Strategy

The app uses React Query for server state management:

- Automatic caching (1 minute stale time)
- Background refetching disabled
- Retry on failure (1 attempt)
- Loading and error states handled

Example:

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['members'],
  queryFn: () => membersService.getMembers({ page: 1, limit: 100 }),
});
```

## AI-Powered Group Suggestions

The unconnected members feature includes AI-powered group suggestions using Google Gemini:

1. Admin clicks "Suggest Groups" for a member
2. App sends member profile to Gemini AI via Genkit
3. AI analyzes interests, age, family status
4. Returns 3 best-fit connect group recommendations
5. Admin can assign member to suggested group

To enable, set `GEMINI_API_KEY` in `.env`

## Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables for Production

Make sure to set production values:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

## Development Tips

### Adding New API Endpoints

1. Add types to `src/lib/api/types.ts`
2. Create service in `src/lib/api/services/`
3. Export from `src/lib/api/index.ts`
4. Use with React Query in components

### Adding New Pages

1. Create page in `src/app/(main)/your-page/page.tsx`
2. Add route to `src/components/main-nav.tsx`
3. Add permission checks if needed

### Adding New Components

1. UI components go in `src/components/ui/`
2. Feature components go in page-specific folders
3. Shared components go in `src/components/`

## Troubleshooting

### "Failed to load members"

- Check that Shepherd backend is running
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check browser console for CORS errors

### "Unauthorized" / Redirect to Login

- Check that you're logged in
- Verify backend is returning valid JWT tokens
- Check localStorage for tokens

### Type Errors

- Run `npm run typecheck` to see all errors
- Ensure backend types match `src/lib/api/types.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checks
5. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Remember**: This is a pastoral care and administrative tool. Every feature should help staff serve the church community better while respecting member privacy and consent.
