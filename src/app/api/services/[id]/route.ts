import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { rows } = await pool.query(
      'SELECT * FROM services WHERE id = $1',
      [id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
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
    const { title, name, logo, link, sortOrder, isActive, type, description } = body;

    if (!title || !type) {
      return NextResponse.json(
        { error: 'Title and type are required' },
        { status: 400 }
      );
    }

    if (type === 'service' && (!name || !logo || !link)) {
      return NextResponse.json(
        { error: 'Name, logo, and link required for service type' },
        { status: 400 }
      );
    }

    await pool.query(
      'UPDATE services SET title = $1, name = $2, logo = $3, link = $4, "sortOrder" = $5, "isActive" = $6, type = $7, description = $8, "updatedAt" = NOW() WHERE id = $9',
      [title, name || null, logo || null, link || null, sortOrder || 0, isActive !== undefined ? isActive : true, type, description || null, id]
    );

    return NextResponse.json(
      { success: true, message: 'Service updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
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
    await pool.query(
      'DELETE FROM services WHERE id = $1',
      [id]
    );

    return NextResponse.json(
      { success: true, message: 'Service deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
