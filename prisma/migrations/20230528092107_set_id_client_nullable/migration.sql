-- DropForeignKey
ALTER TABLE "Distributeur" DROP CONSTRAINT "Distributeur_idClient_fkey";

-- AlterTable
ALTER TABLE "Distributeur" ALTER COLUMN "idClient" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Distributeur" ADD CONSTRAINT "Distributeur_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
