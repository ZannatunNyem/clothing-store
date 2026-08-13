import prisma from "./lib/prisma";

async function main() {
  const categories = await prisma.category.findMany();
  console.log(categories);
}

main();
