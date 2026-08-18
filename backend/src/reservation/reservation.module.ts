import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { ReservationExpiryService } from './reservation-expiry.service';

@Module({
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ReservationExpiryService,
  ],
})
export class ReservationModule {}