import { PrismaClient } from '@prisma/client';

declare global {
  var prismaAuth: PrismaClient | undefined;
}

export const prisma = globalThis.prismaAuth || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaAuth = prisma;
}
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Disconnecting Prisma Client...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Disconnecting Prisma Client...');
  await prisma.$disconnect();
  process.exit(0);
});