import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'iPhone 16 Pro',
        description: 'Apple Smartphone',
        price: 999.99,
        stock: 10,
      },
      {
        name: 'MacBook Pro',
        description: 'Apple Laptop',
        price: 1999.99,
        stock: 5,
      },
      {
        name: 'AirPods Pro',
        description: 'Wireless Earbuds',
        price: 249.99,
        stock: 15,
      },
    ],
  });

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });