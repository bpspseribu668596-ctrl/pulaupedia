import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

interface MainPortalRow extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  icon: string;
  href: string;
  sortOrder: number;
  isActive: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    const connection = await pool.getConnection();
    
    let query = 'SELECT * FROM main_portals';
    if (!all) {
      query += ' WHERE isActive = TRUE';
    }
    query += ' ORDER BY sortOrder ASC';

    const [rows] = await connection.query<MainPortalRow[]>(query);
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json([]);
    }

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

    const connection = await pool.getConnection();
    
    const result = await connection.query(
      'INSERT INTO main_portals (name, description, icon, href, sortOrder, isActive) VALUES (?, ?, ?, ?, ?, TRUE)',
      [name, description || null, icon, href, sortOrder || 0]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Portal created successfully', id: (result as any)[0].insertId },
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
