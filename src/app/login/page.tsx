import { loginAction } from "./actions";
import { Input } from "@/components/forms";

export default function LoginPage() {
  return (
    <main>
      <h1>Login</h1>
      <form action={loginAction}>
        <Input label="Work email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
