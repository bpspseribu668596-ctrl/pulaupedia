import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

interface PortalItemRow extends RowDataPacket {
  id: number;
  portalId: number;
  name: string;
  description: string;
  icon: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const portalId = parseInt(id);
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    const connection = await pool.getConnection();
    
    let query = 'SELECT * FROM portal_items WHERE portalId = ?';
    if (!all) {
      query += ' AND isActive = TRUE';
    }
    query += ' ORDER BY sortOrder ASC';

    const [rows] = await connection.query<PortalItemRow[]>(query, [portalId]);
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const portalId = parseInt(id);
    const body = await request.json();
    const { name, description, icon, link, sortOrder } = body;

    if (!name || !icon || !link) {
      return NextResponse.json(
        { error: 'Name, icon, and link are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    const result = await connection.query(
      'INSERT INTO portal_items (portalId, name, description, icon, link, sortOrder, isActive) VALUES (?, ?, ?, ?, ?, ?, TRUE)',
      [portalId, name, description || null, icon, link, sortOrder || 0]
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
