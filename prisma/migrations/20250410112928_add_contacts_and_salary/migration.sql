/*
  Warnings:

  - You are about to drop the column `contact` on the `EmployerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `SeekerProfile` table. All the data in the column will be lost.
  - Added the required column `email` to the `EmployerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `EmployerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `EmployerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `SeekerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `SeekerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "EmployerProfile" DROP COLUMN "contact",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" INTEGER NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "salary" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SeekerProfile" DROP COLUMN "contact",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" INTEGER NOT NULL;
