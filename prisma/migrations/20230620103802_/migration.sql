-- DropForeignKey
ALTER TABLE "Distributeur" DROP CONSTRAINT "Distributeur_idAM_fkey";

-- AlterTable
ALTER TABLE "Distributeur" ALTER COLUMN "idAM" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Distributeur" ADD CONSTRAINT "Distributeur_idAM_fkey" FOREIGN KEY ("idAM") REFERENCES "AM"("id") ON DELETE SET NULL ON UPDATE CASCADE;
