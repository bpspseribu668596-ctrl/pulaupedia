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
  documents: any;
  sortOrder: number;
  isActive: boolean;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id, itemId } = await params;
    const portalId = parseInt(id);
    const parsedItemId = parseInt(itemId);
    
    const connection = await pool.getConnection();
    
    const [rows] = await connection.query<PortalItemRow[]>(
      'SELECT * FROM portal_items WHERE id = ? AND portalId = ?',
      [parsedItemId, portalId]
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
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id, itemId } = await params;
    const portalId = parseInt(id);
    const parsedItemId = parseInt(itemId);
    const body = await request.json();
    const { name, description, icon, link, sortOrder, isActive, documents } = body;

    if (!name || !icon || !link) {
      return NextResponse.json(
        { error: 'Name, icon, and link are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE portal_items SET name = ?, description = ?, icon = ?, link = ?, documents = ?, sortOrder = ?, isActive = ?, updatedAt = NOW() WHERE id = ? AND portalId = ?',
      [name, description || null, icon, link, JSON.stringify(documents || []), sortOrder || 0, isActive !== undefined ? isActive : true, parsedItemId, portalId]
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
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id, itemId } = await params;
    const portalId = parseInt(id);
    const parsedItemId = parseInt(itemId);
    
    const connection = await pool.getConnection();
    
    await connection.query(
      'DELETE FROM portal_items WHERE id = ? AND portalId = ?',
      [parsedItemId, portalId]
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
