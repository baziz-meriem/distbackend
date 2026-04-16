/*
  Warnings:

  - You are about to drop the column `label` on the `Categorie` table. All the data in the column will be lost.
  - Added the required column `TrancheAge` to the `Categorie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexe` to the `Categorie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categorie" DROP COLUMN "label",
ADD COLUMN     "TrancheAge" TEXT NOT NULL,
ADD COLUMN     "sexe" TEXT NOT NULL;
