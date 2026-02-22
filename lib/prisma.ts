import { PrismaClient } from "@/app/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import config from "@/lib/config-env";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: config.env.databaseUrl,
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
