import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

interface PortalItem extends RowDataPacket {
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
    
    let query = 'SELECT * FROM main_portal_items';
    if (!all) {
      query += ' WHERE isActive = TRUE';
    }
    query += ' ORDER BY sortOrder ASC';

    const [rows] = await connection.query<PortalItem[]>(query);
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching portal items:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, icon, href, sortOrder } = body;

    if (!name || !description || !icon || !href) {
      return NextResponse.json(
        { error: 'Name, description, icon, and href are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    const result = await connection.query(
      'INSERT INTO main_portal_items (name, description, icon, href, sortOrder, isActive) VALUES (?, ?, ?, ?, ?, TRUE)',
      [name, description, icon, href, sortOrder || 0]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Portal item created successfully', id: (result as any)[0].insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating portal item:', error);
    return NextResponse.json(
      { error: 'Failed to create portal item' },
      { status: 500 }
    );
  }
}
