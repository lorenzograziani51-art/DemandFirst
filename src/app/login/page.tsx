import { loginAction } from "./actions";
import { Button, Input } from "@/components/forms";
import { PageShell, InfoCard } from "@/components/layout";

export default function LoginPage() {
  return (
    <PageShell
      eyebrow="Account Access"
      title="Login"
      description="Authenticate with your work credentials to enter the DemandFirst workspace."
    >
      <InfoCard>
        <form action={loginAction} className="df-form">
          <Input label="Work email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Button>Login</Button>
        </form>
      </InfoCard>
    </PageShell>
  );
}
