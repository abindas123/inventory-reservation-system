import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class ReservationExpiryService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron('*/30 * * * * *')
  async expireReservations() {
      console.log('Cron running...', new Date());
  console.log('Checking for expired reservations...');
    const expiredReservations = await this.prisma.reservation.findMany({
      where: {
        status: ReservationStatus.RESERVED,
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    for (const reservation of expiredReservations) {
      await this.prisma.$transaction(async (tx) => {
        await tx.product.update({
          where: {
            id: reservation.productId,
          },
          data: {
            stock: {
              increment: reservation.quantity,
            },
          },
        });

        await tx.reservation.update({
          where: {
            id: reservation.id,
          },
          data: {
            status: ReservationStatus.EXPIRED,
          },
        });
      });
    }
  }
}