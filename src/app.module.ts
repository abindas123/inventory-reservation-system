import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { ReservationModule } from './reservation/reservation.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    ProductModule,
    ReservationModule,
    OrderModule,
  ],
})
export class AppModule {}