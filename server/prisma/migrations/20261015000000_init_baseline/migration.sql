-- CreateTable
CREATE TABLE `City` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cfg` VARCHAR(191) NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `scale` DOUBLE NOT NULL DEFAULT 1.0,
    `value` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `City_cityId_key`(`cityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KeyData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` VARCHAR(191) NOT NULL,
    `metricId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `account` DOUBLE NOT NULL,
    `diff` DOUBLE NOT NULL,
    `status` INTEGER NOT NULL,

    UNIQUE INDEX `KeyData_cityId_metricId_key`(`cityId`, `metricId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesTrend` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `value` DOUBLE NOT NULL,

    UNIQUE INDEX `SalesTrend_cityId_date_key`(`cityId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderTrend` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `value` DOUBLE NOT NULL,

    UNIQUE INDEX `OrderTrend_cityId_date_key`(`cityId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TodayData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` VARCHAR(191) NOT NULL,
    `metricId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `account` DOUBLE NOT NULL,
    `diff` DOUBLE NOT NULL,
    `status` INTEGER NOT NULL,

    UNIQUE INDEX `TodayData_cityId_metricId_key`(`cityId`, `metricId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LatestOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` VARCHAR(191) NOT NULL,
    `cityId` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `LatestOrder_orderId_key`(`orderId`),
    INDEX `LatestOrder_cityId_createdAt_idx`(`cityId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserStatistics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,

    INDEX `UserStatistics_cityId_category_idx`(`cityId`, `category`),
    UNIQUE INDEX `UserStatistics_cityId_category_name_key`(`cityId`, `category`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HotProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `ratio` DOUBLE NOT NULL DEFAULT 0,

    INDEX `HotProduct_cityId_idx`(`cityId`),
    UNIQUE INDEX `HotProduct_cityId_productName_key`(`cityId`, `productName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `KeyData` ADD CONSTRAINT `KeyData_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesTrend` ADD CONSTRAINT `SalesTrend_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderTrend` ADD CONSTRAINT `OrderTrend_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TodayData` ADD CONSTRAINT `TodayData_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LatestOrder` ADD CONSTRAINT `LatestOrder_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserStatistics` ADD CONSTRAINT `UserStatistics_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotProduct` ADD CONSTRAINT `HotProduct_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChannelStatistics` ADD CONSTRAINT `ChannelStatistics_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

