import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { existsSync } from 'fs';
import { join } from 'path';

const STORAGE_DIR = join(process.cwd(), 'storage', 'uploads');

function resolveLogoPath(logo: string | null | undefined): string | null {
  if (!logo) return null;
  const filepath = join(STORAGE_DIR, logo.replace(/^uploads\//, ''));
  return existsSync(filepath) ? logo : null;
}

interface ServiceRow extends RowDataPacket {
  id: number;
  title: string;
  name: string;
  logo: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
  type: string;
  description?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    const connection = await pool.getConnection();
    
    let query = 'SELECT * FROM services';
    if (!all) {
      query += ' WHERE isActive = TRUE AND type = "service"';
    } else {
      query += ' WHERE isActive = TRUE';
    }
    query += ' ORDER BY sortOrder ASC';

    const [rows] = await connection.query<ServiceRow[]>(query);
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(rows.map((row) => ({
      ...row,
      logo: row.type === 'service' ? resolveLogoPath(row.logo) : row.logo,
    })));
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, name, logo, link, sortOrder, type, description } = body;

    if (!title || !type) {
      return NextResponse.json(
        { error: 'Title and type are required' },
        { status: 400 }
      );
    }

    if (type === 'service' && (!name || !logo || !link)) {
      return NextResponse.json(
        { error: 'Name, logo, and link required for service type' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    const result = await connection.query(
      'INSERT INTO services (title, name, logo, link, sortOrder, isActive, type, description) VALUES (?, ?, ?, ?, ?, TRUE, ?, ?)',
      [title, name || null, logo || null, link || null, sortOrder || 0, type, description || null]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Service created successfully', id: (result as any)[0].insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
