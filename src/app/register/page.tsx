import { registerAction } from "./actions";
import { Button, Input } from "@/components/forms";
import { PageShell, InfoCard } from "@/components/layout";

export default function RegisterPage() {
  return (
    <PageShell
      eyebrow="Organization Onboarding"
      title="Create account"
      description="Set up your DemandFirst access with business credentials."
    >
      <InfoCard>
        <form action={registerAction} className="df-form">
          <Input label="Work email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Input label="Full name" name="fullName" required={false} />
          <Button>Create account</Button>
        </form>
      </InfoCard>
    </PageShell>
  );
}
