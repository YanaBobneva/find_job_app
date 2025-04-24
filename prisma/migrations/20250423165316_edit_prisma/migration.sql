/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `experienceLevelId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `experienceLevelId` on the `SeekerProfile` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExperienceLevel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `experienceLevel` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceLevel` to the `SeekerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_experienceLevelId_fkey";

-- DropForeignKey
ALTER TABLE "SeekerProfile" DROP CONSTRAINT "SeekerProfile_experienceLevelId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "categoryId",
DROP COLUMN "experienceLevelId",
ADD COLUMN     "experienceLevel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SeekerProfile" DROP COLUMN "experienceLevelId",
ADD COLUMN     "experienceLevel" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "ExperienceLevel";
