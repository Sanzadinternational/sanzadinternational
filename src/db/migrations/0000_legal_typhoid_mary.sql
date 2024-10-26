CREATE TABLE IF NOT EXISTS "Agent_registration" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Agent_registration_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"Company_name" varchar(255) NOT NULL,
	"Address" varchar(255) NOT NULL,
	"Country" varchar(255) NOT NULL,
	"City" varchar(255) NOT NULL,
	"Zip_code" integer NOT NULL,
	"IATA_Code" integer NOT NULL,
	"Gst_Vat_Tax_number" integer NOT NULL,
	"Contact_Person" varchar(255) NOT NULL,
	"Email" varchar(255) NOT NULL,
	"Password" varchar(255) NOT NULL,
	"Office_number" integer NOT NULL,
	"Mobile_number" integer NOT NULL,
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
CREATE TABLE IF NOT EXISTS "otps" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "otps_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" text NOT NULL,
	"otp" text NOT NULL,
	"is_verified" boolean DEFAULT false,
	"verification_code" text NOT NULL
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
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_type" text NOT NULL,
	"vehicle_brand" text NOT NULL,
	"type_service" varchar(255) NOT NULL,
	"vehicle_model" integer NOT NULL,
	"doors" varchar(255) NOT NULL,
	"seats" varchar(255) NOT NULL,
	"category_space" integer,
	"max_number_pax_accommodate" varchar(255) NOT NULL,
	"luggage_information" varchar(255) NOT NULL,
	"max_number_medium_suitcase" varchar(255) NOT NULL,
	"max_number_carbin_bag" varchar(255) NOT NULL,
	"space_available_other_luggage" integer NOT NULL,
	"location_details" varchar(255) NOT NULL,
	"transfer_information" varchar(255) NOT NULL,
	"service_providing_location" varchar(255) NOT NULL,
	"airport" varchar(255) NOT NULL,
	"port_cruise" varchar(255) NOT NULL,
	"station" varchar(255) NOT NULL,
	"city_center" varchar(255) NOT NULL,
	"vehicle_for" varchar(255) NOT NULL,
	"half_day_city_limit_4hrs" boolean DEFAULT false,
	"half_day_city_limit_8hrs" boolean DEFAULT false,
	"inclusions" boolean DEFAULT true,
	"vehicle_rent" integer NOT NULL,
	"fuel" varchar(255) NOT NULL,
	"driver" varchar(255) NOT NULL,
	"parking_fees" integer NOT NULL,
	"toll_or_taxes" integer NOT NULL,
	"driver_tips" integer NOT NULL,
	"other" varchar(255) NOT NULL
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
CREATE TABLE IF NOT EXISTS "supplier_register" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "supplier_register_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
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
	"password" varchar(255) NOT NULL,
	CONSTRAINT "supplier_register_email_unique" UNIQUE("email")
);
