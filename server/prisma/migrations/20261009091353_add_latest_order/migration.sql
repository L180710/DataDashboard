-- CreateTable
CREATE TABLE `LatestOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` VARCHAR(191) NOT NULL,
    `cityId` VARCHAR(191) NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `LatestOrder_orderId_key`(`orderId`),
    INDEX `LatestOrder_cityId_createAt_idx`(`cityId`, `createAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LatestOrder` ADD CONSTRAINT `LatestOrder_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;
