import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function createContext() {
  return { prisma };
}

export type Context = ReturnType<typeof createContext>;