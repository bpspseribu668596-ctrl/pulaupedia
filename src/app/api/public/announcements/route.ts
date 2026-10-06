import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    let query = 'SELECT * FROM announcements';
    if (!all) {
      query += ' WHERE "isActive" = TRUE';
    }
    query += ' ORDER BY "createdAt" DESC';

    const { rows } = await pool.query(query);

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

    const { rows } = await pool.query(
      'INSERT INTO announcements (title, content, image, "isActive") VALUES ($1, $2, $3, TRUE) RETURNING id',
      [title, content, image || null]
    );

    return NextResponse.json(
      { success: true, message: 'Announcement created successfully', id: rows[0].id },
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
