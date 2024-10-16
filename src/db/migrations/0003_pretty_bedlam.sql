ALTER TABLE "supplier_register" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "supplier_register" DROP COLUMN IF EXISTS "image_path";