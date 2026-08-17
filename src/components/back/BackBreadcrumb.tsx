import Link from "next/link";

export type Crumb = {
  name: string;
  href: string;
};

/** Visible breadcrumb — must match BreadcrumbList JSON-LD on the same page. */
export function BackBreadcrumb({
  items,
  tone = "light",
}: {
  items: Crumb[];
  tone?: "light" | "dark";
}) {
  if (items.length < 2) return null;

  const muted = tone === "dark" ? "text-white/40" : "text-black/40";
  const current = tone === "dark" ? "text-white/70" : "text-black/55";
  const hover = tone === "dark" ? "hover:text-white" : "hover:text-black";

  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.16em] ${muted}`}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.href}-${i}`} className="flex min-w-0 items-center gap-x-2">
              {i > 0 ? (
                <span aria-hidden className="text-current opacity-50">
                  /
                </span>
              ) : null}
              {last ? (
                <span className={`truncate ${current}`}>{item.name}</span>
              ) : (
                <Link href={item.href} className={`truncate transition-colors ${hover}`}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
