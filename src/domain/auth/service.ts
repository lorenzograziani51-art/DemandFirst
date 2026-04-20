import { addDays } from "./time";
import { prisma } from "@/lib/prisma";
import { hashSecret, verifySecret } from "@/lib/hash";
import { generateSessionToken, hashSessionToken } from "@/lib/session";
import { loginInputSchema, registerInputSchema, type LoginInput, type RegisterInput } from "./validation";

const sessionTtlDays = Number.parseInt(process.env.SESSION_TTL_DAYS ?? "14", 10);

export class AuthService {
  async register(rawInput: RegisterInput) {
    const input = registerInputSchema.parse(rawInput);

    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) {
      throw new Error("Email is already registered");
    }

    const passwordHash = await hashSecret(input.password);
    const user = await prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        fullName: input.fullName,
      },
    });

    return this.createSession(user.id);
  }

  async login(rawInput: LoginInput) {
    const input = loginInputSchema.parse(rawInput);

    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const valid = await verifySecret(input.password, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid email or password");
    }

    return this.createSession(user.id);
  }

  async getUserFromSessionToken(token: string) {
    const tokenHash = hashSessionToken(token);
    const session = await prisma.session.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!session || session.expiresAt <= new Date()) {
      return null;
    }

    return session.user;
  }

  async revokeSession(token: string) {
    const tokenHash = hashSessionToken(token);
    await prisma.session.deleteMany({ where: { tokenHash } });
  }

  private async createSession(userId: string) {
    const rawToken = generateSessionToken();
    const tokenHash = hashSessionToken(rawToken);
    const expiresAt = addDays(new Date(), sessionTtlDays);

    await prisma.session.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });

    return { sessionToken: rawToken, expiresAt };
  }
}
