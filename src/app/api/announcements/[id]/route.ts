import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

interface AnnouncementRow extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  image: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query<AnnouncementRow[]>(
      'SELECT * FROM announcements WHERE id = ?',
      [id]
    );
    connection.release();

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

    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE announcements SET title = ?, content = ?, image = ?, isActive = ?, updatedAt = NOW() WHERE id = ?',
      [title, content, image || null, isActive !== undefined ? isActive : true, id]
    );

    connection.release();

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
    const connection = await pool.getConnection();
    
    await connection.query(
      'DELETE FROM announcements WHERE id = ?',
      [id]
    );

    connection.release();

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
