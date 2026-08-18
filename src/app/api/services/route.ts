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
}

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query<ServiceRow[]>(
      'SELECT * FROM services WHERE isActive = TRUE ORDER BY sortOrder ASC'
    );
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(rows.map((row) => ({
      ...row,
      logo: resolveLogoPath(row.logo),
    })));
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, name, logo, link, sortOrder } = body;

    if (!title || !name || !logo || !link) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    const result = await connection.query(
      'INSERT INTO services (title, name, logo, link, sortOrder, isActive) VALUES (?, ?, ?, ?, ?, TRUE)',
      [title, name, logo, link, sortOrder || 0]
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
