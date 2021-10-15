/*
  Warnings:

  - You are about to alter the column `lastLogin` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `sellDate` on the `vehicles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `lastLogin` DATETIME;

-- AlterTable
ALTER TABLE `vehicles` DROP COLUMN `sellDate`;

-- CreateTable
CREATE TABLE `Clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(80) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `adress` VARCHAR(150) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Clients_email_key`(`email`),
    UNIQUE INDEX `Clients_phone_key`(`phone`),
    UNIQUE INDEX `Clients_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sellDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sellValue` FLOAT NOT NULL,
    `idClient` INTEGER NOT NULL,
    `idVehicle` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Sales_idVehicle_unique`(`idVehicle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `Clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_idVehicle_fkey` FOREIGN KEY (`idVehicle`) REFERENCES `Vehicles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
