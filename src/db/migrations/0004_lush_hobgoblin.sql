CREATE TABLE IF NOT EXISTS "supplier_details_services" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "supplier_details_services_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"vehicle_type" varchar(255) NOT NULL,
	"vehicle_brand" integer NOT NULL,
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
	"tick_box" boolean DEFAULT true,
	"vehicle_rent" integer NOT NULL,
	"fuel" varchar(255) NOT NULL,
	"driver" varchar(255) NOT NULL,
	"parking_fees" integer NOT NULL,
	"toll_or_taxes" integer NOT NULL,
	"driver_tips" integer NOT NULL,
	"other" varchar(255) NOT NULL
);
