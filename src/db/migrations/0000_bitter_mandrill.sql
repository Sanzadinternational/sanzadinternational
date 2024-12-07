CREATE TABLE IF NOT EXISTS "Agent_registration" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Agent_registration_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"Company_name" varchar(255) NOT NULL,
	"Address" varchar(255) NOT NULL,
	"Country" varchar(255) NOT NULL,
	"City" varchar(255) NOT NULL,
	"Zip_code" varchar(255) NOT NULL,
	"IATA_Code" varchar(255) NOT NULL,
	"Gst_Vat_Tax_number" varchar(255) NOT NULL,
	"Contact_Person" varchar(255) NOT NULL,
	"Email" varchar(255) NOT NULL,
	"Otp" varchar(255) NOT NULL,
	"Password" varchar(255) NOT NULL,
	"Office_number" varchar(255) NOT NULL,
	"Mobile_number" varchar(255) NOT NULL,
	"Currency" varchar(255) NOT NULL,
	"Gst_Tax_Certificate" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "OneWayTrip" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "OneWayTrip_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"pick_up_location" varchar(255) NOT NULL,
	"drop_off_location" varchar(255) NOT NULL,
	"date" date NOT NULL,
	"passengers" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RoundTrip" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "RoundTrip_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"pick_up_location" varchar(255) NOT NULL,
	"drop_off_location" varchar(255) NOT NULL,
	"date" date NOT NULL,
	"return_date" date NOT NULL,
	"passengers" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forget_password" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "forget_password_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"resetToken" varchar(255),
	"resetTokenExpires" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "otps" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "otps_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" text NOT NULL,
	"otp" text NOT NULL,
	"is_verified" boolean DEFAULT false,
	"verification_code" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "otpss" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "otpss_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" text NOT NULL,
	"otp" text NOT NULL,
	"otpExpiry" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" integer,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "supplier_details" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "supplier_details_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"Vehicle_type" varchar(255) NOT NULL,
	"Vehicle_brand" varchar(255) NOT NULL,
	"Type_service" varchar(255) NOT NULL,
	"Vehicle_model" varchar(255) NOT NULL,
	"Doors" varchar(255) NOT NULL,
	"Seats" varchar(255) NOT NULL,
	"Category_space" varchar(255),
	"Max_number_pax_accommodate" varchar(255) NOT NULL,
	"Luggage_information" varchar(255) NOT NULL,
	"Max_number_medium_suitcase" varchar(255) NOT NULL,
	"Max_number_carbin_bag" varchar(255) NOT NULL,
	"Space_available_other_luggage" varchar(255) NOT NULL,
	"Location_details" varchar(255) NOT NULL,
	"Transfer_information" varchar(255) NOT NULL,
	"Service_providing_location" varchar(255) NOT NULL,
	"Airport" varchar(255) NOT NULL,
	"Port_cruise" varchar(255) NOT NULL,
	"Station" varchar(255) NOT NULL,
	"City_center" varchar(255) NOT NULL,
	"Vehicle_for" varchar(255) NOT NULL,
	"Half_day_city_limit_4hrs" varchar(255),
	"Full_day_city_limit_8hrs" varchar(255),
	"Inclusions" varchar(255),
	"Vehicle_rent" varchar(255) NOT NULL,
	"Fuel" varchar(255) NOT NULL,
	"Driver" varchar(255) NOT NULL,
	"Parking_fees" varchar(255) NOT NULL,
	"Toll_or_taxes" varchar(255) NOT NULL,
	"Driver_tips" varchar(255) NOT NULL,
	"Other" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "One_Way_Service_Details" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "One_Way_Service_Details_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"country" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"location_from_airport" varchar(255) NOT NULL,
	"location_from_port_cruise" varchar(255) NOT NULL,
	"location_from_station" varchar(255) NOT NULL,
	"location_from_city_center" varchar(255) NOT NULL,
	"location_to_airport" varchar(255) NOT NULL,
	"location_to_port_cruise" varchar(255) NOT NULL,
	"location_to_station" varchar(255) NOT NULL,
	"location_to_city_center" varchar(255) NOT NULL,
	"night_time_supplement" varchar(255) NOT NULL,
	"vice_versa" varchar(255) NOT NULL,
	"half_day_city_limit_4hrs" varchar(255) NOT NULL,
	"full_day_city_limit_8hrs" varchar(255) NOT NULL,
	"from_date" date NOT NULL,
	"to_date" date NOT NULL,
	"price" integer NOT NULL,
	"new_location" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "price" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "price_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"country" varchar(255),
	"city" varchar(255),
	"location_from_airport" varchar(255),
	"location_from_port_cruise" varchar(255),
	"location_from_station" varchar(255),
	"location_from_city_center" varchar(255),
	"location_to_airport" varchar(255),
	"location_to_port_cruise" varchar(255),
	"location_to_station" varchar(255),
	"location_to_city_center" varchar(255),
	"night_time_supplement" varchar(255),
	"vice_versa" varchar(255),
	"half_day_city_limit_4hrs" varchar(255),
	"full_day_city_limit_8hrs" varchar(255),
	"from_date" varchar(255),
	"to_date" varchar(255),
	"price" varchar(255),
	"new_location" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Roundtrip_Service_Price_Details" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Roundtrip_Service_Price_Details_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"country" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"location_from_airport" varchar(255) NOT NULL,
	"location_from_port_cruise" varchar(255) NOT NULL,
	"location_from_station" varchar(255) NOT NULL,
	"location_from_city_center" varchar(255) NOT NULL,
	"location_to_airport" varchar(255) NOT NULL,
	"location_to_port_cruise" varchar(255) NOT NULL,
	"location_to_station" varchar(255) NOT NULL,
	"location_to_city_center" varchar(255) NOT NULL,
	"night_time_supplement" varchar(255) NOT NULL,
	"vice_versa" varchar(255) NOT NULL,
	"half_day_city_limit_4hrs" varchar(255) NOT NULL,
	"full_day_city_limit_8hrs" varchar(255) NOT NULL,
	"from_date" date NOT NULL,
	"to_date" date NOT NULL,
	"price" integer NOT NULL,
	"new_location" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Supplier_Apidata" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Supplier_Apidata_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"Api" varchar(255),
	"Api_User" varchar(255) NOT NULL,
	"Api_Password" varchar(255) NOT NULL,
	"Api_Id_Foreign" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transport_nodes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "transport_nodes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"formatted_address" varchar(255),
	"location_lat" varchar(255),
	"location_lon" varchar(255),
	"description" varchar(255),
	"place_id" varchar(255),
	"country" varchar(255),
	"airport_or_establishment" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "supplier" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "supplier_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"Company_name" varchar(255) NOT NULL,
	"Owner" varchar(255) NOT NULL,
	"Address" varchar(255) NOT NULL,
	"Country" varchar(255) NOT NULL,
	"City" varchar(255) NOT NULL,
	"Zip_code" varchar(255) NOT NULL,
	"Office_number" varchar(255) NOT NULL,
	"Email" varchar(255) NOT NULL,
	"Contact_Person" varchar(255) NOT NULL,
	"Otp" varchar(255) NOT NULL,
	"Mobile_number" varchar(255) NOT NULL,
	"Gst_Vat_Tax_number" varchar(255) NOT NULL,
	"PAN_number" varchar(255) NOT NULL,
	"Currency" varchar(255) NOT NULL,
	"Gst_Tax_Certificate" varchar(255) NOT NULL,
	"Password" varchar(255) NOT NULL,
	"Api_key" varchar(255),
	"Is_up" varchar(255),
	CONSTRAINT "supplier_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "supplier_otps" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "supplier_otps_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" text NOT NULL,
	"otp" text NOT NULL,
	"otpExpiry" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Supplier_Apidata" ADD CONSTRAINT "Supplier_Apidata_Api_Id_Foreign_supplier_id_fk" FOREIGN KEY ("Api_Id_Foreign") REFERENCES "public"."supplier"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
