CREATE TABLE IF NOT EXISTS "otps" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "otps_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" text NOT NULL,
	"otp" text NOT NULL,
	"created_at" text DEFAULT 'now()',
	"expires_at" text NOT NULL
);
