import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      product: {
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get(ProductService);
  });

  it('should return all products', async () => {
    const products = [
      {
        id: '1',
        name: 'Laptop',
        stock: 5,
      },
    ];

    prisma.product.findMany.mockResolvedValue(products);

    expect(await service.getAllProducts()).toEqual(products);

    expect(prisma.product.findMany).toHaveBeenCalled();
  });
});