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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    const connection = await pool.getConnection();
    
    let query = 'SELECT * FROM announcements';
    if (!all) {
      query += ' WHERE isActive = TRUE';
    }
    query += ' ORDER BY createdAt DESC';

    const [rows] = await connection.query<AnnouncementRow[]>(query);
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, image } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    const result = await connection.query(
      'INSERT INTO announcements (title, content, image, isActive) VALUES (?, ?, ?, TRUE)',
      [title, content, image || null]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Announcement created successfully', id: (result as any)[0].insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating announcement:', error);
    return NextResponse.json(
      { error: 'Failed to create announcement' },
      { status: 500 }
    );
  }
}
