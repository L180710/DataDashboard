/*
  Warnings:

  - You are about to drop the column `createAt` on the `latestorder` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `latestorder` table. All the data in the column will be lost.
  - Added the required column `productName` to the `LatestOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `LatestOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `latestorder` DROP FOREIGN KEY `LatestOrder_cityId_fkey`;

-- DropIndex
DROP INDEX `LatestOrder_cityId_createAt_idx` ON `latestorder`;

-- AlterTable
ALTER TABLE `latestorder` DROP COLUMN `createAt`,
    DROP COLUMN `customerName`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `productName` VARCHAR(191) NOT NULL,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `LatestOrder_cityId_createdAt_idx` ON `LatestOrder`(`cityId`, `createdAt`);

