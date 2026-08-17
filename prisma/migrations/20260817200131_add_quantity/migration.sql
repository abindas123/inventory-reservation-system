/*
  Warnings:

  - Added the required column `quantity` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ReservationStatus" ADD VALUE 'RESERVED';

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "quantity" INTEGER NOT NULL;
