import { integer, pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const registerTable = pgTable('register', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  company_name_or_owns_car: varchar({ length: 255 }).notNull(),
  owner_name: varchar({ length: 255 }).notNull(),
  office_address: varchar({ length: 255 }).notNull(),
  country: varchar({ length: 255 }).notNull(), 
  city: varchar({ length: 255 }).notNull(),
  zipcode: integer().notNull(),
  office_number: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  contact_person: integer().notNull(),
  mobile_number: integer().notNull(),
  tax_no_or_vat_no: integer().notNull(),
  pan_number: integer().notNull(),
  currency: varchar({ length: 255 }).notNull(),
  image: varchar({ length: 255 }).notNull(),
  imagepath: text('image_path').notNull(), 
});

