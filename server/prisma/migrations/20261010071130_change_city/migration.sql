/*
  Warnings:

  - You are about to drop the `userstatistic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userstatistic` DROP FOREIGN KEY `UserStatistic_cityId_fkey`;

-- DropTable
DROP TABLE `userstatistic`;

-- CreateTable
CREATE TABLE `UserStatistics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,

    INDEX `UserStatistics_cityId_category_idx`(`cityId`, `category`),
    UNIQUE INDEX `UserStatistics_cityId_category_type_key`(`cityId`, `category`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserStatistics` ADD CONSTRAINT `UserStatistics_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;
