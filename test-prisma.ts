import prisma from "./lib/prisma";

async function main() {
  const result = await prisma.$queryRaw`SELECT NOW()`;

  console.log("Database connected:", result);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
