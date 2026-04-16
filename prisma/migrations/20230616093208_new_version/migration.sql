/*
  Warnings:

  - Added the required column `TypePayment` to the `AnnonceRegion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Annonceur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Annonce" ADD COLUMN     "etat" TEXT NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "AnnonceRegion" ADD COLUMN     "NbVues" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "TypePayment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Annonceur" ADD COLUMN     "Adr" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT;
