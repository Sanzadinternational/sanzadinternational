import { integer, pgTable, varchar, text, PgTable, date } from 'drizzle-orm/pg-core'; 

// export const AgentTable=pgTable('Agent_registration',
//     {
//       id:integer().primaryKey().generatedAlwaysAsIdentity(),
//       Company_name: varchar({length:255}).notNull(),
//       Address:varchar({length:255}).notNull(),
//       Country:varchar({length:255}).notNull(),
//       City:varchar({length:255}).notNull(),
//       Zip_code:varchar({length:255}).notNull(),
//       IATA_Code:varchar({length:255}).notNull(),
//       Gst_Vat_Tax_number:varchar({length:255}).notNull(), 
//       Contact_Person:varchar({length:255}).notNull(),
//       Email:varchar({length:255}).notNull(),
//       Otp:varchar({length:255}).notNull(),
//       Password:varchar({length:255}).notNull(), 
//       Office_number:varchar({length:255}).notNull(),
//       Mobile_number:varchar({length:255}).notNull(),
//       Currency:varchar({length:255}).notNull(),
//       Gst_Tax_Certificate:varchar({length:255}).notNull(), 
//     }
// )
export const AgentTable = pgTable('Agent', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  Company_name: varchar({ length: 255 }).notNull(),
  Address: varchar({ length: 255 }).notNull(),
  Country: varchar({ length: 255 }).notNull(),
  City: varchar({ length: 255 }).notNull(),
  Zip_code: varchar({ length: 255 }).notNull(),
  IATA_Code: varchar({ length: 255 }).notNull(),
  Gst_Vat_Tax_number: varchar({ length: 255 }).notNull(),
  Contact_Person: varchar({ length: 255 }).notNull(),
  Email: varchar({ length: 255 }).notNull(),
  Otp: varchar({ length: 255 }).notNull(),
  Password: varchar({ length: 255 }).notNull(),
  Office_number: varchar({ length: 255 }).notNull(),
  Mobile_number: varchar({ length: 255 }).notNull(),
  Currency: varchar({ length: 255 }).notNull(),
  Gst_Tax_Certificate: varchar({ length: 255 }).notNull(),
});
export const OneWayTripTable =pgTable('OneWayTrip', 
  {
      id:integer().primaryKey().generatedAlwaysAsIdentity(),
      pick_up_location:varchar({length:255}).notNull(),
      drop_off_location:varchar({length:255}).notNull(),
      date: date().notNull(),
      passengers:integer().notNull(), 
  } 
) 
export const UpdateOneWayTripTable =pgTable('OneWayTrip', 
  {
      id:integer().primaryKey().generatedAlwaysAsIdentity(),
      pick_up_location:varchar({length:255}).notNull(),
      drop_off_location:varchar({length:255}).notNull(),
      date: date().notNull(),
      passengers:integer().notNull(), 
  } 
) 

export const RoundTripTable =pgTable('RoundTrip', 
  {
      id:integer().primaryKey().generatedAlwaysAsIdentity(), 
      pick_up_location:varchar({length:255}).notNull(), 
      drop_off_location:varchar({length:255}).notNull(), 
      date: date().notNull(), 
      return_date:date().notNull(), 
      passengers:integer().notNull(), 
  } 
) 

