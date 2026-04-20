import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export const hashSecret = async (input: string): Promise<string> => bcrypt.hash(input, SALT_ROUNDS);

export const verifySecret = async (input: string, hash: string): Promise<boolean> => bcrypt.compare(input, hash);
