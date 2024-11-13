CREATE TABLE IF NOT EXISTS "forget_password" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "forget_password_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"resetToken" varchar(255),
	"resetTokenExpires" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "Agent" RENAME TO "Agent_registration";