import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { existsSync } from 'fs';
import { join } from 'path';

const STORAGE_DIR = join(process.cwd(), 'storage', 'uploads');

function resolveLogoPath(logo: string | null | undefined): string | null {
  if (!logo) return null;
  const filepath = join(STORAGE_DIR, logo.replace(/^uploads\//, ''));
  return existsSync(filepath) ? logo : null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    let query = 'SELECT * FROM services';
    if (!all) {
      query += ' WHERE "isActive" = TRUE AND type = \'service\'';
    } else {
      query += ' WHERE "isActive" = TRUE';
    }
    query += ' ORDER BY "sortOrder" ASC';

    const { rows } = await pool.query(query);

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

    const { rows } = await pool.query(
      'INSERT INTO services (title, name, logo, link, "sortOrder", "isActive", type, description) VALUES ($1, $2, $3, $4, $5, TRUE, $6, $7) RETURNING id',
      [title, name || null, logo || null, link || null, sortOrder || 0, type, description || null]
    );

    return NextResponse.json(
      { success: true, message: 'Service created successfully', id: rows[0].id },
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
