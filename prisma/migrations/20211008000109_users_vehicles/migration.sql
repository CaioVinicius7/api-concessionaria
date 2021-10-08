-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(80) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `lastLogin` DATETIME,
    `verifiedEmail` VARCHAR(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(35) NOT NULL,
    `model` VARCHAR(80) NOT NULL,
    `manufacturer` VARCHAR(50) NOT NULL,
    `year` INTEGER NOT NULL,
    `price` FLOAT NOT NULL,
    `listPrice` FLOAT NOT NULL,
    `procedence` VARCHAR(30) NOT NULL,
    `size` VARCHAR(15) NOT NULL,
    `places` INTEGER NOT NULL,
    `ports` INTEGER,
    `exchange` VARCHAR(20) NOT NULL,
    `marches` INTEGER NOT NULL,
    `urbanConsume` FLOAT NOT NULL,
    `roadConsume` FLOAT NOT NULL,
    `description` TEXT NOT NULL,
    `observation` TEXT,
    `status` VARCHAR(10) NOT NULL,
    `sellDate` DATE,
    `img` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
