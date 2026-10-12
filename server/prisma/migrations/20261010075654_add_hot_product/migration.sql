-- CreateTable
CREATE TABLE `HotProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,

    INDEX `HotProduct_cityId_idx`(`cityId`),
    UNIQUE INDEX `HotProduct_cityId_productName_key`(`cityId`, `productName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HotProduct` ADD CONSTRAINT `HotProduct_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;
