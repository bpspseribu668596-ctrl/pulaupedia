import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { rows } = await pool.query(
      'SELECT * FROM announcements WHERE id = $1',
      [id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching announcement:', error);
    return NextResponse.json(
      { error: 'Failed to fetch announcement' },
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
    const { title, content, image, isActive } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    await pool.query(
      'UPDATE announcements SET title = $1, content = $2, image = $3, "isActive" = $4, "updatedAt" = NOW() WHERE id = $5',
      [title, content, image || null, isActive !== undefined ? isActive : true, id]
    );

    return NextResponse.json(
      { success: true, message: 'Announcement updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating announcement:', error);
    return NextResponse.json(
      { error: 'Failed to update announcement' },
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
      'DELETE FROM announcements WHERE id = $1',
      [id]
    );

    return NextResponse.json(
      { success: true, message: 'Announcement deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return NextResponse.json(
      { error: 'Failed to delete announcement' },
      { status: 500 }
    );
  }
}
