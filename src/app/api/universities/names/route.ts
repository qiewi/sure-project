import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ids = url.searchParams.get('ids');

  if (!ids) {
    return NextResponse.json({ error: 'No university IDs provided' }, { status: 400 });
  }

  try {
    const universityIds = ids.split(',').map((id) => parseInt(id, 10));

    // Fetch university names based on the IDs
    const universities = await prisma.university.findMany({
      where: {
        id: { in: universityIds }, // Matches the Prisma schema's `id` field
      },
      select: {
        id: true, // Ensure we're using `id`, mapped from `id_university`
        name: true, // The field mapped from `university_name`
      },
    });

    // Create a dictionary mapping IDs to names
    const result = universities.reduce<Record<number, string>>((acc, uni) => {
        acc[uni.id] = uni.name;
        return acc;
    }, {});
  

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching university names:', error);
    return NextResponse.json(
      { error: 'Database error', details: String(error) },
      { status: 500 }
    );
  }
}