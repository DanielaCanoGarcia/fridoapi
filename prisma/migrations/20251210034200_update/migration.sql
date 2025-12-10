/*
  Warnings:

  - You are about to drop the column `tipo_usuario` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `usuario` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "tipo_usuario",
ADD COLUMN     "usuario" TEXT NOT NULL;
