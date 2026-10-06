import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

function resolveImagePath(imagePath: string | null | undefined): string | null {
  if (!imagePath) return null;
  return imagePath;
}

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM headers WHERE id = 1');

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        id: 1,
        title: 'PULAU PEDIA',
        subtitle: 'Portal Informasi dan Layanan Digital BPS Kepulauan Seribu',
        backgroundImage: null,
      });
    }

    return NextResponse.json({
      ...rows[0],
      backgroundImage: resolveImagePath(rows[0].backgroundImage),
    });
  } catch (error) {
    console.error('Error fetching header:', error);
    return NextResponse.json(
      { id: 1, title: null, subtitle: null, backgroundImage: null },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, backgroundImage } = body;

    if (!title || !subtitle) {
      return NextResponse.json(
        { error: 'Title and subtitle are required' },
        { status: 400 }
      );
    }

    await pool.query(
      'UPDATE headers SET title = $1, subtitle = $2, "backgroundImage" = $3, "updatedAt" = NOW() WHERE id = 1',
      [title, subtitle, backgroundImage]
    );

    return NextResponse.json(
      { success: true, message: 'Header updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating header:', error);
    return NextResponse.json(
      { error: 'Failed to update header' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await pool.query(
      'UPDATE headers SET title = $1, subtitle = $2, "backgroundImage" = $3, "updatedAt" = NOW() WHERE id = 1',
      ['PULAU PEDIA', 'Portal Informasi dan Layanan Digital BPS Kepulauan Seribu', 'uploads/headers/default.jpg']
    );

    return NextResponse.json(
      { success: true, message: 'Header reset to default' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resetting header:', error);
    return NextResponse.json(
      { error: 'Failed to reset header' },
      { status: 500 }
    );
  }
}
