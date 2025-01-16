import { integer, pgTable, varchar,timestamp, text, PgTable, date } from 'drizzle-orm/pg-core'; 

export const AdminTable = pgTable('admin',{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    Email:varchar({length:255}).notNull(),
    Password:varchar({length:255}).notNull(),
    Role:varchar({length:255})
})


