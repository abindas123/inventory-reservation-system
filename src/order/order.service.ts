import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './create-order.dto';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(dto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      const reservation = await tx.reservation.findUnique({
        where: {
          id: dto.reservationId,
        },
      });

      if (!reservation) {
        throw new BadRequestException('Reservation not found');
      }

      if (reservation.status !== ReservationStatus.RESERVED) {
        throw new BadRequestException('Reservation is not active');
      }

      if (reservation.expiresAt < new Date()) {
        throw new BadRequestException('Reservation expired');
      }

      const product = await tx.product.findUnique({
        where: {
          id: reservation.productId,
        },
      });

      if (!product) {
        throw new BadRequestException('Product not found');
      }

      const order = await tx.order.create({
        data: {
          reservationId: reservation.id,
          productId: product.id,
          quantity: reservation.quantity,
          totalAmount: product.price.mul(reservation.quantity),
        },
      });

      await tx.reservation.update({
        where: {
          id: reservation.id,
        },
        data: {
          status: ReservationStatus.COMPLETED,
        },
      });

      return order;
    });
  }
}