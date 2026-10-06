import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id, itemId } = await params;

    const { rows } = await pool.query(
      'SELECT * FROM portal_items WHERE id = $1 AND "portalId" = $2',
      [parseInt(itemId), parseInt(id)]
    );

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
    const body = await request.json();
    const { name, description, icon, link, sortOrder, isActive, documents } = body;

    if (!name || !icon || !link) {
      return NextResponse.json(
        { error: 'Name, icon, and link are required' },
        { status: 400 }
      );
    }

    await pool.query(
      'UPDATE portal_items SET name = $1, description = $2, icon = $3, link = $4, documents = $5, "sortOrder" = $6, "isActive" = $7, "updatedAt" = NOW() WHERE id = $8 AND "portalId" = $9',
      [name, description || null, icon, link, JSON.stringify(documents || []), sortOrder || 0, isActive !== undefined ? isActive : true, parseInt(itemId), parseInt(id)]
    );

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

    await pool.query(
      'DELETE FROM portal_items WHERE id = $1 AND "portalId" = $2',
      [parseInt(itemId), parseInt(id)]
    );

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
