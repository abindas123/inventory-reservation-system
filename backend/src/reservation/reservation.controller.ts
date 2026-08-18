import { Body, Controller, Post,Get,Param } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './create-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
@Get(':id')
findOne(@Param('id') id: string) {
  return this.reservationService.findOne(id);
}
  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.reservationService.createReservation(dto);
  }
}