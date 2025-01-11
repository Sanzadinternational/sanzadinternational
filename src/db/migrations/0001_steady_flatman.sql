CREATE TABLE IF NOT EXISTS "SearchCar" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "SearchCar_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"From" varchar(255),
	"To" varchar(255),
	"distance" integer,
	"Currency" varchar(255)
);
