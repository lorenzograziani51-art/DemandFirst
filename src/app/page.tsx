import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>DemandFirst Foundation</h1>
      <p>Demand-led workflow for buyers, suppliers, and experts.</p>
      <ul>
        <li><Link href="/register">Register</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/onboarding">Onboarding</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
      </ul>
    </main>
  );
}
