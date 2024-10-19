/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "av_branches_t" (
    "branch_id" SERIAL NOT NULL,
    "branch_name" TEXT NOT NULL,
    "branch_logo" TEXT NOT NULL,
    "branch_url" TEXT NOT NULL,
    "branch_address" TEXT NOT NULL,
    "branch_status" BOOLEAN NOT NULL,
    "created_by" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "av_branches_t_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "av_user_types" (
    "user_type_id" SERIAL NOT NULL,
    "user_type" TEXT NOT NULL,
    "branch_id" INTEGER NOT NULL,

    CONSTRAINT "av_user_types_pkey" PRIMARY KEY ("user_type_id")
);

-- CreateTable
CREATE TABLE "av_user_t" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "user_type_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "modified_by" INTEGER NOT NULL,
    "modified_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "av_user_t_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "av_user_types_user_type_key" ON "av_user_types"("user_type");

-- CreateIndex
CREATE UNIQUE INDEX "av_user_t_email_key" ON "av_user_t"("email");

-- CreateIndex
CREATE UNIQUE INDEX "av_user_t_mobile_key" ON "av_user_t"("mobile");

-- AddForeignKey
ALTER TABLE "av_user_types" ADD CONSTRAINT "av_user_types_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "av_branches_t"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "av_user_t" ADD CONSTRAINT "av_user_t_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "av_branches_t"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "av_user_t" ADD CONSTRAINT "av_user_t_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "av_user_types"("user_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
