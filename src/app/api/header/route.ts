import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

interface HeaderRow extends RowDataPacket {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query<HeaderRow[]>('SELECT * FROM headers WHERE id = 1');
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        id: 1,
        title: 'PULAU PEDIA',
        subtitle: 'Portal Informasi dan Layanan Digital BPS Kepulauan Seribu',
        backgroundImage: 'uploads/headers/default.jpg',
      });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching header:', error);
    return NextResponse.json(
      {
        id: 1,
        title: 'PULAU PEDIA',
        subtitle: 'Portal Informasi dan Layanan Digital BPS Kepulauan Seribu',
        backgroundImage: 'uploads/headers/default.jpg',
      },
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

    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE headers SET title = ?, subtitle = ?, backgroundImage = ?, updatedAt = NOW() WHERE id = 1',
      [title, subtitle, backgroundImage]
    );

    connection.release();

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
    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE headers SET title = ?, subtitle = ?, backgroundImage = ?, updatedAt = NOW() WHERE id = 1',
      ['PULAU PEDIA', 'Portal Informasi dan Layanan Digital BPS Kepulauan Seribu', 'uploads/headers/default.jpg']
    );

    connection.release();

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
