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
  contacts: string;
  links: string;
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
        companyName: null,
        companyAddress: null,
        contacts: null,
        links: null,
        logo: null,
      });
    }

    const row = rows[0];
    return NextResponse.json({
      ...row,
      companyAddress: typeof row.companyAddress === 'string' ? JSON.parse(row.companyAddress) : row.companyAddress,
      contacts: typeof row.contacts === 'string' ? JSON.parse(row.contacts) : row.contacts,
      links: typeof row.links === 'string' ? JSON.parse(row.links) : row.links,
      logo: resolveLogoPath(row.logo),
    });
  } catch (error) {
    console.error('Error fetching footer:', error);
    return NextResponse.json(
      {
        id: 1,
        companyName: null,
        companyAddress: null,
        contacts: null,
        links: null,
        logo: null,
      },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, companyAddress, contacts, links, logo } = body;

    if (!companyName) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE footer_config SET companyName = ?, companyAddress = ?, contacts = ?, links = ?, logo = ?, updatedAt = NOW() WHERE id = 1',
      [
        companyName, 
        JSON.stringify(companyAddress || []),
        JSON.stringify(contacts || []),
        JSON.stringify(links || []),
        logo
      ]
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
      'UPDATE footer_config SET companyName = ?, companyAddress = ?, contacts = ?, links = ?, logo = ?, updatedAt = NOW() WHERE id = 1',
      [
        'BPS Kepulauan Seribu', 
        JSON.stringify(['Jalan Raya Pulau Panjang, Kepulauan Seribu, DKI Jakarta']),
        JSON.stringify([{ label: 'Telepon', value: '+62-21-XXXXXX' }]),
        JSON.stringify([{ label: 'Email', url: 'mailto:info@kepulauanseribu.bps.go.id' }]),
        'uploads/footer/logo.png'
      ]
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
