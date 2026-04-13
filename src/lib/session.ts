import { randomBytes, createHash } from "crypto";

const TOKEN_BYTES = 32;

export const generateSessionToken = (): string => randomBytes(TOKEN_BYTES).toString("hex");

export const hashSessionToken = (token: string): string => createHash("sha256").update(token).digest("hex");
