import { integer, pgTable, varchar,timestamp, text, PgTable, date } from 'drizzle-orm/pg-core'; 
 
export const SupperAdminTable = pgTable('SupperAdmin',{ 
    id: integer().primaryKey().generatedAlwaysAsIdentity(), 
    Email:varchar({length:255}), 
    Password:varchar({length:255}),
    Role:varchar({length:255}) 
})  
 

