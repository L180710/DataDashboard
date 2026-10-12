-- CreateTable
CREATE TABLE `UserStatistic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,

    INDEX `UserStatistic_cityId_category_idx`(`cityId`, `category`),
    UNIQUE INDEX `UserStatistic_cityId_category_type_key`(`cityId`, `category`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LatestOrder` ADD CONSTRAINT `LatestOrder_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserStatistic` ADD CONSTRAINT `UserStatistic_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;
