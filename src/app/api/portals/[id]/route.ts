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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);
    const connection = await pool.getConnection();
    
    const [rows] = await connection.query<MainPortalRow[]>(
      'SELECT * FROM main_portals WHERE id = ?',
      [parsedId]
    );
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'Portal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching portal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portal' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);
    const body = await request.json();
    const { name, description, icon, href, sortOrder, isActive } = body;

    if (!name || !icon || !href) {
      return NextResponse.json(
        { error: 'Name, icon, and href are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE main_portals SET name = ?, description = ?, icon = ?, href = ?, sortOrder = ?, isActive = ?, updatedAt = NOW() WHERE id = ?',
      [name, description || null, icon, href, sortOrder || 0, isActive !== undefined ? isActive : true, parsedId]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Portal updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating portal:', error);
    return NextResponse.json(
      { error: 'Failed to update portal' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);
    const connection = await pool.getConnection();
    
    await connection.query(
      'DELETE FROM main_portals WHERE id = ?',
      [parsedId]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Portal deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting portal:', error);
    return NextResponse.json(
      { error: 'Failed to delete portal' },
      { status: 500 }
    );
  }
}
