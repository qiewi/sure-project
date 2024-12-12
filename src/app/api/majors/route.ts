// File: src/app/api/majors/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const majors = await prisma.major.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive', 
        },
      },
      select: {
        name: true,
      },
      take: 3, // Fetch more results initially to ensure uniqueness
    });

    // Remove duplicate names using a Set
    const uniqueMajors = Array.from(new Set(majors.map((major) => major.name))).map((name) => ({ name }));

    return NextResponse.json(uniqueMajors);
  } catch (error) {
    console.error('Error fetching majors:', error);
    return NextResponse.json({ error: 'Error fetching majors' }, { status: 500 });
  }
}
