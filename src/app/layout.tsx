import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DemandFirst",
  description: "Demand-led B2B cosmetics marketplace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="df-app-shell">{children}</div>
      </body>
    </html>
  );
}
