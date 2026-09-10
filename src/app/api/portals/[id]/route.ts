import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { rows } = await pool.query(
      'SELECT * FROM main_portals WHERE id = $1',
      [parseInt(id)]
    );

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
    const body = await request.json();
    const { name, description, icon, href, sortOrder, isActive } = body;

    if (!name || !icon || !href) {
      return NextResponse.json(
        { error: 'Name, icon, and href are required' },
        { status: 400 }
      );
    }

    await pool.query(
      'UPDATE main_portals SET name = $1, description = $2, icon = $3, href = $4, "sortOrder" = $5, "isActive" = $6, "updatedAt" = NOW() WHERE id = $7',
      [name, description || null, icon, href, sortOrder || 0, isActive !== undefined ? isActive : true, parseInt(id)]
    );

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

    await pool.query(
      'DELETE FROM main_portals WHERE id = $1',
      [parseInt(id)]
    );

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
