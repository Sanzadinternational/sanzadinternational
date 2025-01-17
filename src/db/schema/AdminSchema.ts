import { integer, pgTable, varchar,timestamp, text, PgTable, date, boolean, pgEnum } from 'drizzle-orm/pg-core'; 
export const RoleEnum = pgEnum('role', ['admin', 'superadmin']); 
export const AdminTable = pgTable('admin',{ 
    id: integer().primaryKey().generatedAlwaysAsIdentity(), 
    Email:varchar({length:255}), 
    Company_name:varchar({length:255}),
    Password:varchar({length:255}), 
    Role: RoleEnum().notNull(), 
    Agent: boolean().default(false), 
    Supplier:boolean().default(false), 
    Payment:boolean().default(false) 
}) 


