import type { IconName } from "@/types/content";

interface IconProps {
  name: IconName;
  className?: string;
}

const PATHS: Record<IconName, React.ReactNode> = {
  capital: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v10M9.5 9.2c0-1.1 1.1-1.7 2.5-1.7s2.5.7 2.5 1.9c0 2.6-5 1.6-5 4.1 0 1.2 1.1 2 2.5 2s2.5-.6 2.5-1.7" />
    </>
  ),
  companies: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M6 20.5V6l6-2.5V20.5" />
      <path d="M12 20.5V9l6 2.2v9.3" />
      <path d="M9 8.5h0M9 12h0M9 15.5h0M15 13.5h0M15 16.5h0" />
    </>
  ),
  markets: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.3 3.5 5.4 3.5 8.5s-1.2 6.2-3.5 8.5c-2.3-2.3-3.5-5.4-3.5-8.5S9.7 5.8 12 3.5Z" />
    </>
  ),
  experience: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  retention: (
    <>
      <path d="M12 20s-7-4.3-7-9.2C5 8.1 6.9 6.3 9.2 6.3c1.4 0 2.5.7 2.8 1.6.3-.9 1.4-1.6 2.8-1.6 2.3 0 4.2 1.8 4.2 4.5 0 4.9-7 9.2-7 9.2Z" />
    </>
  ),
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}
