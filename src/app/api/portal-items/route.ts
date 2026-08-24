import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

interface PortalItem extends RowDataPacket {
  id: number;
  portalPageId: number;
  name: string;
  description: string;
  icon: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const portalPageId = searchParams.get('portalPageId');
    const all = searchParams.get('all') === 'true';

    const connection = await pool.getConnection();
    
    let query = 'SELECT * FROM portal_items';
    const params: any[] = [];

    if (portalPageId) {
      query += ' WHERE portalPageId = ?';
      params.push(portalPageId);
      if (!all) {
        query += ' AND isActive = TRUE';
      }
    } else if (!all) {
      query += ' WHERE isActive = TRUE';
    }
    
    query += ' ORDER BY sortOrder ASC';

    const [rows] = await connection.query<PortalItem[]>(query, params);
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
    const { portalPageId, name, description, icon, link, sortOrder } = body;

    if (!portalPageId || !name || !icon) {
      return NextResponse.json(
        { error: 'portalPageId, name, and icon are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    const result = await connection.query(
      'INSERT INTO portal_items (portalPageId, name, description, icon, link, sortOrder, isActive) VALUES (?, ?, ?, ?, ?, ?, TRUE)',
      [portalPageId, name, description || null, icon, link || null, sortOrder || 0]
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
