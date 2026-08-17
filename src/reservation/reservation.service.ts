import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './create-reservation.dto';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async createReservation(dto: CreateReservationDto) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: {
          id: dto.productId,
        },
      });

      if (!product) {
        throw new BadRequestException('Product not found');
      }

      if (product.stock < dto.quantity) {
        throw new BadRequestException('Insufficient stock');
      }

      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            decrement: dto.quantity,
          },
        },
      });

      const reservation = await tx.reservation.create({
        data: {
          productId: product.id,
          quantity: dto.quantity,
          status: ReservationStatus.RESERVED,
          expiresAt: new Date(Date.now() + 30* 1000),
        },
      });

      return reservation;
    });
  }
}