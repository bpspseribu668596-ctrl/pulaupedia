import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const portalId = parseInt(id);
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    let query = 'SELECT * FROM portal_items WHERE "portalId" = $1';
    if (!all) {
      query += ' AND "isActive" = TRUE';
    }
    query += ' ORDER BY "sortOrder" ASC';

    const { rows } = await pool.query(query, [portalId]);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching portal items:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const portalId = parseInt(id);
    const body = await request.json();
    const { name, description, icon, link, sortOrder, documents } = body;

    if (!name || !icon || !link) {
      return NextResponse.json(
        { error: 'Name, icon, and link are required' },
        { status: 400 }
      );
    }

    const { rows } = await pool.query(
      'INSERT INTO portal_items ("portalId", name, description, icon, link, documents, "sortOrder", "isActive") VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE) RETURNING id',
      [portalId, name, description || null, icon, link, JSON.stringify(documents || []), sortOrder || 0]
    );

    return NextResponse.json(
      { success: true, message: 'Portal item created successfully', id: rows[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating portal item:', error);
    return NextResponse.json(
      { error: 'Failed to create portal item' },
      { status: 500 }
    );
  }
}
