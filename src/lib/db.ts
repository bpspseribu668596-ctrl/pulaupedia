import { Pool } from 'pg';

// PostgreSQL pool untuk Supabase (production)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('supabase.co')
    ? { rejectUnauthorized: false }
    : false,
});

export default pool;
