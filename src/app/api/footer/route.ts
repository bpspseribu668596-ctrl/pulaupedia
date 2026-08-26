import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { existsSync } from 'fs';
import { join } from 'path';

const STORAGE_DIR = join(process.cwd(), 'storage', 'uploads');

function resolveLogoPath(logo: string | null | undefined): string | null {
  if (!logo) return null;
  const filepath = join(STORAGE_DIR, logo.replace(/^uploads\//, ''));
  return existsSync(filepath) ? logo : null;
}

interface FooterRow extends RowDataPacket {
  id: number;
  companyName: string;
  companyAddress: string;
  phone: string;
  email: string;
  logo: string;
}

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query<FooterRow[]>('SELECT * FROM footer_config WHERE id = 1');
    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        id: 1,
        companyName: 'BPS Kepulauan Seribu',
        companyAddress: 'Jalan Raya Pulau Panjang, Kepulauan Seribu, DKI Jakarta',
        phone: '+62-21-XXXXXX',
        email: 'info@kepulauanseribu.bps.go.id',
        logo: null,
      });
    }

    return NextResponse.json({
      ...rows[0],
      logo: resolveLogoPath(rows[0].logo),
    });
  } catch (error) {
    console.error('Error fetching footer:', error);
    return NextResponse.json(
      {
        id: 1,
        companyName: null,
        companyAddress: null,
        phone: null,
        email: null,
        logo: null,
      },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, companyAddress, phone, email, logo } = body;

    if (!companyName || !companyAddress || !phone || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE footer_config SET companyName = ?, companyAddress = ?, phone = ?, email = ?, logo = ?, updatedAt = NOW() WHERE id = 1',
      [companyName, companyAddress, phone, email, logo]
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Footer config updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating footer:', error);
    return NextResponse.json(
      { error: 'Failed to update footer config' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE footer_config SET companyName = ?, companyAddress = ?, phone = ?, email = ?, logo = ?, updatedAt = NOW() WHERE id = 1',
      ['BPS Kepulauan Seribu', 'Jalan Raya Pulau Panjang, Kepulauan Seribu, DKI Jakarta', '+62-21-XXXXXX', 'info@kepulauanseribu.bps.go.id', 'uploads/footer/logo.png']
    );

    connection.release();

    return NextResponse.json(
      { success: true, message: 'Footer config reset to default' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error resetting footer:', error);
    return NextResponse.json(
      { error: 'Failed to reset footer config' },
      { status: 500 }
    );
  }
}
