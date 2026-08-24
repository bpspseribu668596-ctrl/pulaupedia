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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    const connection = await pool.getConnection();
    
    let query = 'SELECT * FROM portal_pages';
    if (!all) {
      query += ' WHERE isActive = TRUE';
    }
    query += ' ORDER BY slug ASC';

    const [rows] = await connection.query<PortalPage[]>(query);
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching portal pages:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, description, content, image } = body;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'Slug, title, and content are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    const result = await connection.query(
      'INSERT INTO portal_pages (slug, title, description, content, image, isActive) VALUES (?, ?, ?, ?, ?, TRUE)',
      [slug, title, description || null, content, image || null]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Portal page created successfully', id: (result as any)[0].insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating portal page:', error);
    return NextResponse.json(
      { error: 'Failed to create portal page' },
      { status: 500 }
    );
  }
}
