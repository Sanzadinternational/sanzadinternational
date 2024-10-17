ALTER TABLE "supplier_details" ADD COLUMN "half_day_city_limit_8hrs" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "supplier_details" DROP COLUMN IF EXISTS "full_day_city_limit_8hrs";