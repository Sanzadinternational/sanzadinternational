CREATE TABLE IF NOT EXISTS "SupperAdmin" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "SupperAdmin_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"Email" varchar(255),
	"Password" varchar(255)
);
