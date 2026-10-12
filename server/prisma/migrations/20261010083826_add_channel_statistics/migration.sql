-- CreateTable
CREATE TABLE `ChannelStatistics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ratio` DOUBLE NOT NULL,
    `value` INTEGER NOT NULL,

    INDEX `ChannelStatistics_cityId_idx`(`cityId`),
    UNIQUE INDEX `ChannelStatistics_cityId_name_key`(`cityId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ChannelStatistics` ADD CONSTRAINT `ChannelStatistics_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;
