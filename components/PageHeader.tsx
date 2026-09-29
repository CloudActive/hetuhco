import type { ReactNode } from "react";

export function PageHeader({ title, lede, children }: { title: string; lede?: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
      {lede && <p className="mt-3 max-w-2xl text-lg text-muted">{lede}</p>}
      {children}
    </div>
  );
}
