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

-- AddForeignKey
ALTER TABLE `KeyData` ADD CONSTRAINT `KeyData_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`cityId`) ON DELETE RESTRICT ON UPDATE CASCADE;
