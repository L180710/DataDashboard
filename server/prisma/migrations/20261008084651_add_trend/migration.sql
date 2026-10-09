/*
  Warnings:

  - You are about to drop the column `name` on the `ordertrend` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `salestrend` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cityId,date]` on the table `OrderTrend` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cityId,date]` on the table `SalesTrend` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `OrderTrend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `SalesTrend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ordertrend` DROP FOREIGN KEY `OrderTrend_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `salestrend` DROP FOREIGN KEY `SalesTrend_cityId_fkey`;

-- DropIndex
DROP INDEX `OrderTrend_cityId_name_key` ON `ordertrend`;

-- DropIndex
DROP INDEX `SalesTrend_cityId_name_key` ON `salestrend`;

-- AlterTable
ALTER TABLE `ordertrend` DROP COLUMN `name`,
    ADD COLUMN `date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `salestrend` DROP COLUMN `name`,
    ADD COLUMN `date` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `OrderTrend_cityId_date_key` ON `OrderTrend`(`cityId`, `date`);

-- CreateIndex
CREATE UNIQUE INDEX `SalesTrend_cityId_date_key` ON `SalesTrend`(`cityId`, `date`);

-- AddForeignKey
ALTER TABLE `SalesTrend` ADD CONSTRAINT `SalesTrend_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderTrend` ADD CONSTRAINT `OrderTrend_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;
