/*
  Warnings:

  - You are about to drop the column `taxnumber` on the `restaurant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taxNumber]` on the table `restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taxNumber` to the `restaurant` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `permissionLevel` on the `user_restaurant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "restaurant_taxnumber_key";

-- AlterTable
ALTER TABLE "restaurant" DROP COLUMN "taxnumber",
ADD COLUMN     "taxNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_restaurant" DROP COLUMN "permissionLevel",
ADD COLUMN     "permissionLevel" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_taxNumber_key" ON "restaurant"("taxNumber");
