import { integer, pgTable, varchar, text,timestamp, PgTable, date } from 'drizzle-orm/pg-core'; 

export const registerTable = pgTable('supplier', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  Company_name: varchar({ length: 255 }).notNull(),
  Owner: varchar({ length: 255 }).notNull(),
  Address: varchar({ length: 255 }).notNull(),
  Country: varchar({ length: 255 }).notNull(), 
  City: varchar({ length: 255 }).notNull(),
  Zip_code: varchar({length:255}).notNull(),
  Office_number: varchar({length:255}).notNull(),
  Email: varchar({ length: 255 }).notNull().unique(),
  Contact_Person: varchar({length:255}).notNull(),
  Otp:varchar({length:255}).notNull(),
  Mobile_number: varchar({length:255}).notNull(),
  Gst_Vat_Tax_number: varchar({length:255}).notNull(), 
  PAN_number: varchar({length:255}).notNull(), 
  Currency: varchar({ length: 255 }).notNull(),
  Gst_Tax_Certificate: varchar({ length: 255 }).notNull(),
  Password: varchar({length:255}).notNull(),
  Api_key:varchar({length:255}),
  Is_up:varchar({length:255}),
 
});

export const One_WayTable = pgTable('One_Way_Service_Details',{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    country:varchar({length:255}).notNull(),
    city:varchar({length:255}).notNull(),
    location_from_airport:varchar({length:255}).notNull(),
    location_from_port_cruise:varchar({length:255}).notNull(),
    location_from_station:varchar({length:255}).notNull(),
    location_from_city_center:varchar({length:255}).notNull(),
    location_to_airport:varchar({length:255}).notNull(),
    location_to_port_cruise:varchar({length:255}).notNull(),
    location_to_station:varchar({length:255}).notNull(),
    location_to_city_center:varchar({length:255}).notNull(),
    night_time_supplement:varchar({length:255}).notNull(),
    vice_versa:varchar({length:255}).notNull(),
    half_day_city_limit_4hrs:varchar({length:255}).notNull(),
    full_day_city_limit_8hrs:varchar({length:255}).notNull(),
    from_date: date().notNull(), 
    to_date: date().notNull(),   
    price: integer().notNull(), 
    new_location: varchar({ length: 255 }).notNull(),

});

export const Roundtrip_Service_Price_Details = pgTable('Roundtrip_Service_Price_Details',{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  country:varchar({length:255}).notNull(),
  city:varchar({length:255}).notNull(),
  location_from_airport:varchar({length:255}).notNull(),
  location_from_port_cruise:varchar({length:255}).notNull(),
  location_from_station:varchar({length:255}).notNull(),
  location_from_city_center:varchar({length:255}).notNull(),
  location_to_airport:varchar({length:255}).notNull(),
  location_to_port_cruise:varchar({length:255}).notNull(),
  location_to_station:varchar({length:255}).notNull(),
  location_to_city_center:varchar({length:255}).notNull(),
  night_time_supplement:varchar({length:255}).notNull(),
  vice_versa:varchar({length:255}).notNull(),
  half_day_city_limit_4hrs:varchar({length:255}).notNull(), 
  full_day_city_limit_8hrs:varchar({length:255}).notNull(),
  from_date: date().notNull(), 
  to_date: date().notNull(),   
  price: integer().notNull(), 
  new_location: varchar({ length: 255 }).notNull(), 
}); 

export const supplier_otps = pgTable('supplier_otps', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    email: text('email').notNull(),
    otp: text('otp').notNull(),
    otpExpiry: timestamp('otpExpiry').notNull(),
});

export type supplier_otps = {
    id: number;
    email: string;
    otp: string;
    otpExpiry: Date;
  };