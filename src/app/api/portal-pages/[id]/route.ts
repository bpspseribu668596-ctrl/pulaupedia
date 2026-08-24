import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

interface PortalPage extends RowDataPacket {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  isActive: boolean;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query<PortalPage[]>(
      'SELECT * FROM portal_pages WHERE id = ?',
      [id]
    );
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'Portal page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching portal page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portal page' },
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
    const { slug, title, description, content, image, isActive } = body;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'Slug, title, and content are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE portal_pages SET slug = ?, title = ?, description = ?, content = ?, image = ?, isActive = ?, updatedAt = NOW() WHERE id = ?',
      [slug, title, description || null, content, image || null, isActive !== undefined ? isActive : true, id]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Portal page updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating portal page:', error);
    return NextResponse.json(
      { error: 'Failed to update portal page' },
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
      'DELETE FROM portal_pages WHERE id = ?',
      [id]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Portal page deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting portal page:', error);
    return NextResponse.json(
      { error: 'Failed to delete portal page' },
      { status: 500 }
    );
  }
}
