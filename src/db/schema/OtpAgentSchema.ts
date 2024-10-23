import { integer, pgTable, varchar, text, PgTable, date } from 'drizzle-orm/pg-core'; 

// models/otp.js
// import { pgTable, text, integer } from 'drizzle-orm/node-postgres';

export const otpTable = pgTable('otps', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  email: text('email').notNull(),
  otp: text('otp').notNull(),
  createdAt: text('created_at').default('now()'),
  expiresAt: text('expires_at').notNull(),
});
