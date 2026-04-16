/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Produit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Produit_label_key" ON "Produit"("label");
