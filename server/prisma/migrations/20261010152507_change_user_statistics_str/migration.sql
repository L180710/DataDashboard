/*
  Warnings:

  - You are about to drop the column `type` on the `userstatistics` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cityId,category,name]` on the table `UserStatistics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `UserStatistics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `userstatistics` DROP FOREIGN KEY `UserStatistics_cityId_fkey`;

-- DropIndex
DROP INDEX `UserStatistics_cityId_category_type_key` ON `userstatistics`;

-- AlterTable
ALTER TABLE `userstatistics` DROP COLUMN `type`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserStatistics_cityId_category_name_key` ON `UserStatistics`(`cityId`, `category`, `name`);

-- AddForeignKey
ALTER TABLE `ChannelStatistics` ADD CONSTRAINT `ChannelStatistics_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;
