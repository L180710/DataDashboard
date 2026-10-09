/*
  Warnings:

  - Added the required column `cfg` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `city` ADD COLUMN `cfg` VARCHAR(191) NOT NULL;
