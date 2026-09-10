import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    let query = 'SELECT * FROM main_portals';
    if (!all) {
      query += ' WHERE "isActive" = TRUE';
    }
    query += ' ORDER BY "sortOrder" ASC';

    const { rows } = await pool.query(query);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching portals:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, icon, href, sortOrder } = body;

    if (!name || !icon || !href) {
      return NextResponse.json(
        { error: 'Name, icon, and href are required' },
        { status: 400 }
      );
    }

    const { rows } = await pool.query(
      'INSERT INTO main_portals (name, description, icon, href, "sortOrder", "isActive") VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id',
      [name, description || null, icon, href, sortOrder || 0]
    );

    return NextResponse.json(
      { success: true, message: 'Portal created successfully', id: rows[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating portal:', error);
    return NextResponse.json(
      { error: 'Failed to create portal' },
      { status: 500 }
    );
  }
}
