import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22V12" />
      <path d="M16 16l-4-4-4 4" />
      <path d="M12 2a4 4 0 0 0-4 4v2" />
      <path d="M12 22a4 4 0 0 0 4-4" />
      <path d="M12 22a4 4 0 0 1-4-4" />
      <path d="M20 12h2" />
      <path d="M2 12h2" />
      <path d="m5 17 1-1" />
      <path d="m18 6 1-1" />
    </svg>
  );
}
