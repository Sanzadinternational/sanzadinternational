CREATE TABLE IF NOT EXISTS "Agent_registration" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Agent_registration_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"Company_name" varchar(255) NOT NULL,
	"Address" varchar(255) NOT NULL,
	"Country" varchar(255) NOT NULL,
	"City" varchar(255) NOT NULL,
	"Zip_code" integer NOT NULL,
	"IATA_Code" integer NOT NULL,
	"Gst_Vat_Tax_number" integer NOT NULL,
	"Contact_number" integer NOT NULL,
	"Email" varchar(255) NOT NULL,
	"Password" varchar(255) NOT NULL,
	"Office_number" integer NOT NULL,
	"Mobile_number" integer NOT NULL,
	"Currency" varchar(255) NOT NULL,
	"Gst_Tax_Certificate" varchar(255) NOT NULL
);
