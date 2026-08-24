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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query<PortalItem[]>(
      'SELECT * FROM main_portal_items WHERE id = ?',
      [id]
    );
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'Portal item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching portal item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portal item' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { name, description, icon, href, sortOrder, isActive } = body;

    if (!name || !description || !icon || !href) {
      return NextResponse.json(
        { error: 'Name, description, icon, and href are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE main_portal_items SET name = ?, description = ?, icon = ?, href = ?, sortOrder = ?, isActive = ?, updatedAt = NOW() WHERE id = ?',
      [name, description, icon, href, sortOrder || 0, isActive !== undefined ? isActive : true, id]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Portal item updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating portal item:', error);
    return NextResponse.json(
      { error: 'Failed to update portal item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const connection = await pool.getConnection();
    
    await connection.query(
      'DELETE FROM main_portal_items WHERE id = ?',
      [id]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Portal item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting portal item:', error);
    return NextResponse.json(
      { error: 'Failed to delete portal item' },
      { status: 500 }
    );
  }
}
