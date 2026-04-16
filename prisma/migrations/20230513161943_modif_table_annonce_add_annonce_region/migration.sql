/*
  Warnings:

  - You are about to drop the column `idRegion` on the `Annonce` table. All the data in the column will be lost.
  - You are about to drop the column `prixAnnonce` on the `Annonce` table. All the data in the column will be lost.
  - You are about to drop the column `idClient` on the `SADM` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Annonce" DROP CONSTRAINT "Annonce_idRegion_fkey";

-- AlterTable
ALTER TABLE "Annonce" DROP COLUMN "idRegion",
DROP COLUMN "prixAnnonce",
ADD COLUMN     "DateDebut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "DateFin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SADM" DROP COLUMN "idClient";

-- CreateTable
CREATE TABLE "AnnonceRegion" (
    "idAnnonce" INTEGER NOT NULL,
    "idRegion" INTEGER NOT NULL,
    "PrixAnnonce" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AnnonceRegion_pkey" PRIMARY KEY ("idAnnonce","idRegion")
);

-- AddForeignKey
ALTER TABLE "AnnonceRegion" ADD CONSTRAINT "AnnonceRegion_idAnnonce_fkey" FOREIGN KEY ("idAnnonce") REFERENCES "Annonce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnonceRegion" ADD CONSTRAINT "AnnonceRegion_idRegion_fkey" FOREIGN KEY ("idRegion") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
