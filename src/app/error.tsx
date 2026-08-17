"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black px-8 py-32 text-white">
      <p className="label-caps text-white/40">500</p>
      <h1 className="font-display mt-6 max-w-[16ch] text-[clamp(2rem,4vw,3.2rem)] font-light">
        Something went wrong.
      </h1>
      <p className="mt-5 max-w-[40ch] text-[15px] text-white/55">
        Try again, or return to the homepage.
      </p>
      <div className="mt-10 flex flex-wrap gap-6">
        <button
          type="button"
          onClick={reset}
          className="label-caps text-white/70 transition-colors hover:text-white"
        >
          Try again
        </button>
        <Link
          href="/"
          className="label-caps text-white/70 transition-colors hover:text-white"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
