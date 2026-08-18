import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

interface ServiceRow extends RowDataPacket {
  id: number;
  title: string;
  name: string;
  logo: string;
  link: string;
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
    const [rows] = await connection.query<ServiceRow[]>(
      'SELECT * FROM services WHERE id = ?',
      [id]
    );
    connection.release();

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
    const { title, name, logo, link, sortOrder, isActive } = body;

    if (!title || !name || !logo || !link) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE services SET title = ?, name = ?, logo = ?, link = ?, sortOrder = ?, isActive = ?, updatedAt = NOW() WHERE id = ?',
      [title, name, logo, link, sortOrder || 0, isActive !== undefined ? isActive : true, id]
    );

    connection.release();

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
    const connection = await pool.getConnection();
    
    await connection.query(
      'DELETE FROM services WHERE id = ?',
      [id]
    );

    connection.release();

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
