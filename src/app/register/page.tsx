import { registerAction } from "./actions";
import { Input } from "@/components/forms";

export default function RegisterPage() {
  return (
    <main>
      <h1>Create account</h1>
      <form action={registerAction}>
        <Input label="Work email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <Input label="Full name" name="fullName" required={false} />
        <button type="submit">Create account</button>
      </form>
    </main>
  );
}
