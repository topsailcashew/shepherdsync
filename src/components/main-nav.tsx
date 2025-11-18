'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  LayoutGrid,
  Link2Off,
  HeartHandshake,
  UsersRound,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/members', label: 'Members', icon: Users },
  { href: '/unconnected', label: 'Unconnected', icon: Link2Off },
  { href: '/ministries', label: 'Ministries', icon: UsersRound, disabled: true },
  {
    href: '/partnership',
    label: 'Partnership',
    icon: HeartHandshake,
    disabled: true,
  },
];

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col', className)}>
      <SidebarMenu>
        {links.map((link) => (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === link.href}
              disabled={link.disabled}
              className="justify-start"
              tooltip={link.label}
            >
              <Link href={link.href}>
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </nav>
  );
}
