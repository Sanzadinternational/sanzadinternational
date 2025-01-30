import { integer, pgTable, varchar,timestamp, text, PgTable, date, boolean, pgEnum } from 'drizzle-orm/pg-core'; 
export const RoleEnum = pgEnum('role', ['admin', 'superadmin']); 
export const AdminTable = pgTable('admin',{ 
    id: integer().primaryKey().generatedAlwaysAsIdentity(), 
    Email:varchar({length:255}), 
    Company_name:varchar({length:255}), 
    Password:varchar({length:255}), 
    Role: RoleEnum().notNull(), 
    Agent_account: boolean().default(false), 
    Agent_operation:boolean().default(false), 
    Supplier_account:boolean().default(false), 
    Supplier_operation:boolean().default(false), 
    IsApproved:integer(),
    Token:varchar({length:255}),
    resetTokenExpiry:varchar({length:255})  
}) 


