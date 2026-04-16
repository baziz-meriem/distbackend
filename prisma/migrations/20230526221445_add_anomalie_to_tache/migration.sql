-- AlterTable
ALTER TABLE "Tache" ADD COLUMN     "idAnomalie" INTEGER,
ALTER COLUMN "dateFinTraitement" DROP NOT NULL,
ALTER COLUMN "dateFinTraitement" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Tache" ADD CONSTRAINT "Tache_idAnomalie_fkey" FOREIGN KEY ("idAnomalie") REFERENCES "Anomalie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
