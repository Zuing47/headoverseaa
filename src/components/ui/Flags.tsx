interface FlagProps {
  className?: string;
}

/** United States flag — simplified, crisp at small sizes. */
export function FlagUS({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label="English">
      <defs>
        <clipPath id="flag-us-round">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-us-round)">
        <rect width="24" height="24" fill="#b22234" />
        {[1, 3, 5, 7, 9, 11].map((i) => (
          <rect key={i} y={(i * 24) / 13} width="24" height={24 / 13} fill="#fff" />
        ))}
        <rect width="11" height={(24 / 13) * 7} fill="#3c3b6e" />
        <g fill="#fff">
          {Array.from({ length: 5 }).flatMap((_, row) =>
            Array.from({ length: row % 2 === 0 ? 3 : 2 }).map((__, col) => (
              <circle
                key={`${row}-${col}`}
                cx={2 + col * 3.4 + (row % 2 === 0 ? 0 : 1.7)}
                cy={1.6 + row * 2.4}
                r="0.7"
              />
            )),
          )}
        </g>
      </g>
    </svg>
  );
}

/** Brazil flag — simplified, crisp at small sizes. */
export function FlagBR({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label="Português">
      <defs>
        <clipPath id="flag-br-round">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-br-round)">
        <rect width="24" height="24" fill="#009b3a" />
        <path d="M12 3.5 21.5 12 12 20.5 2.5 12Z" fill="#fedf00" />
        <circle cx="12" cy="12" r="4" fill="#002776" />
        <path d="M8.3 11.2a7 7 0 0 1 7.6 1.1" fill="none" stroke="#fff" strokeWidth="0.9" />
      </g>
    </svg>
  );
}
