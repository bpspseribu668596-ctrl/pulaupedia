import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

interface NavbarRow extends RowDataPacket {
  id: number;
  logo: string;
  logoAlt: string;
  brandName: string;
}

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query<NavbarRow[]>('SELECT * FROM navbar_config WHERE id = 1');
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        id: 1,
        logo: 'uploads/navbar/logo.png',
        logoAlt: 'Pulau Pedia Logo',
        brandName: 'PULAU PEDIA',
      });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching navbar:', error);
    return NextResponse.json(
      {
        id: 1,
        logo: 'uploads/navbar/logo.png',
        logoAlt: 'Pulau Pedia Logo',
        brandName: 'PULAU PEDIA',
      },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { logo, logoAlt, brandName } = body;

    if (!logoAlt || !brandName) {
      return NextResponse.json(
        { error: 'logoAlt and brandName are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE navbar_config SET logo = ?, logoAlt = ?, brandName = ?, updatedAt = NOW() WHERE id = 1',
      [logo, logoAlt, brandName]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Navbar config updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating navbar:', error);
    return NextResponse.json(
      { error: 'Failed to update navbar config' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE navbar_config SET logo = ?, logoAlt = ?, brandName = ?, updatedAt = NOW() WHERE id = 1',
      ['uploads/navbar/logo.png', 'Pulau Pedia Logo', 'PULAU PEDIA']
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Navbar config reset to default' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resetting navbar:', error);
    return NextResponse.json(
      { error: 'Failed to reset navbar config' },
      { status: 500 }
    );
  }
}
