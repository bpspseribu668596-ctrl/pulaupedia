import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL!;

// Supabase (baik Direct maupun Pooler) membutuhkan SSL.
// Koneksi lokal (localhost / 127.0.0.1) tidak perlu SSL.
const isLocal =
  connectionString.includes('localhost') ||
  connectionString.includes('127.0.0.1');

const pool = new Pool({
  connectionString,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

export default pool;
