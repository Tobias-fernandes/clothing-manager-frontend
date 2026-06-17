import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-20 mx-auto max-w-3xl px-6 py-12 prose prose-neutral dark:prose-invert">
      {children}
    </div>
  );
}
