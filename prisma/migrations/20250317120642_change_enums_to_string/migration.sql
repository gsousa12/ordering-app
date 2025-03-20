-- AlterTable
ALTER TABLE "user_restaurant" ALTER COLUMN "permissionLevel" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DATA TYPE TEXT;
