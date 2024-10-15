CREATE TABLE IF NOT EXISTS "register" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "register_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"company_name_or_owns_car" varchar(255) NOT NULL,
	"owner_name" varchar(255) NOT NULL,
	"office_address" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"zipcode" integer NOT NULL,
	"office_number" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"contact_person" integer NOT NULL,
	"mobile_number" integer NOT NULL,
	"tax_no_or_vat_no" integer NOT NULL,
	"pan_number" integer NOT NULL,
	"currency" varchar(255) NOT NULL,
	"image" varchar(255) NOT NULL,
	-- "image_path" text NOT NULL,
	CONSTRAINT "register_email_unique" UNIQUE("email")
);
