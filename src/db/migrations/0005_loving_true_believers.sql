ALTER TABLE "supplier_details_services" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "supplier_details_services" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "supplier_details_services" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "supplier_details_services" ALTER COLUMN "vehicle_type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "supplier_details_services" ALTER COLUMN "vehicle_brand" SET DATA TYPE text; 