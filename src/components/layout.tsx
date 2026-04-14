import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  children: ReactNode;
};

export function PageShell({ title, description, eyebrow, children }: PageShellProps) {
  return (
    <main className="df-page df-stack">
      <header className="df-stack">
        {eyebrow ? <span className="df-overline">{eyebrow}</span> : null}
        <div className="df-stack" style={{ gap: "0.6rem" }}>
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
      </header>
      {children}
    </main>
  );
}

export function InfoCard({ children }: { children: ReactNode }) {
  return <section className="df-card df-stack">{children}</section>;
}
