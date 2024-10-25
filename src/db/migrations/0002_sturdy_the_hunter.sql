CREATE TABLE IF NOT EXISTS "RoundTrip" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "RoundTrip_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"pick_up_location" varchar(255) NOT NULL,
	"drop_off_location" varchar(255) NOT NULL,
	"date" date NOT NULL,
	"return_date" date NOT NULL,
	"passengers" integer NOT NULL
);