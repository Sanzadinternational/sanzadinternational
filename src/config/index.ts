require('dotenv').config();
export const DB_URI: string = process.env.DATABASE_URI || 'defaultMongoURI'; 