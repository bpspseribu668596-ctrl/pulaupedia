import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

function resolveLogoPath(logo: string | null | undefined): string | null {
  if (!logo) return null;
  return logo;
}

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM navbar_config WHERE id = 1');

    if (!rows || rows.length === 0) {
      return NextResponse.json({
        id: 1,
        logo: null,
        logoAlt: 'Pulau Pedia Logo',
        brandName: 'PULAU PEDIA',
      });
    }

    return NextResponse.json({
      ...rows[0],
      logo: resolveLogoPath(rows[0].logo),
    });
  } catch (error) {
    console.error('Error fetching navbar:', error);
    return NextResponse.json(
      { id: 1, logo: null, logoAlt: 'Pulau Pedia Logo', brandName: 'PULAU PEDIA' },
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

    await pool.query(
      'UPDATE navbar_config SET logo = $1, "logoAlt" = $2, "brandName" = $3, "updatedAt" = NOW() WHERE id = 1',
      [logo, logoAlt, brandName]
    );

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
    await pool.query(
      'UPDATE navbar_config SET logo = $1, "logoAlt" = $2, "brandName" = $3, "updatedAt" = NOW() WHERE id = 1',
      ['uploads/navbar/logo.png', 'Pulau Pedia Logo', 'PULAU PEDIA']
    );

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
