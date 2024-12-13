// File: src/app/api/universities/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const majorName = url.searchParams.get('major_name'); // Fetch major_name directly
  const majorType = url.searchParams.get('type');
  const userAverage = parseFloat(url.searchParams.get('average') || '0');

  if (!majorName || !majorType || isNaN(userAverage)) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  try {
    const tableName = majorType === 'humanities' ? 'scores_humanities' : 'scores_science';
  
    // Construct the SQL query using Prisma.sql
    const query = Prisma.sql`
      SELECT id_university, score
      FROM ${Prisma.raw(tableName)}
      WHERE major_name = ${majorName} AND score < ${userAverage}
      ORDER BY score DESC
      LIMIT 5
    `;
  
    // Execute the query
    const universities = await prisma.$queryRaw(query);
  
    return NextResponse.json(universities);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ error: 'Database error', details: String(error) }, { status: 500 });
  }
}
