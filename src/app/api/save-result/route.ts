import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/lucia";

export const GET = async (req: Request) => {
    try {
      const user = await getUser();
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const savedResults = await prisma.savedResult.findMany({
        where: { userId: user.id },
        include: {
          universityItems: {
            select: {
              id: true,
              universityId: true,
              passingGrade: true, // Include passingGrade in the response
              saved: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
  
      return NextResponse.json(savedResults);
    } catch (error) {
      console.error("Error fetching saved results:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  };
  

export const POST = async (req: Request) => {
    try {
      // Validate user session
      const user = await getUser();
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      // Parse the request body
      const body = await req.json();
      const { majorName, averageScore, universities, majorType } = body;
  
      if (!majorName || !averageScore || !universities || !Array.isArray(universities)) {
        return NextResponse.json(
          { error: "Invalid data. Ensure majorName, averageScore, and universities are provided." },
          { status: 400 }
        );
      }
  
      // Save the result in the SavedResult table
      const savedResult = await prisma.savedResult.create({
        data: {
          userId: user.id,
          majorName,
          majorType,
          averageScore,
          universityItems: {
            create: universities.map((university: { id: number; passingScore: number }) => ({
              universityId: university.id,
              passingGrade: university.passingScore, // Save passing grade
            })),
          },
        },
        include: {
          universityItems: true, // Include university items in the response
        },
      });
  
      return NextResponse.json(savedResult, { status: 201 });
    } catch (error) {
      console.error("Error saving result:", error);
      return NextResponse.json(
        { error: "Internal Server Error. Please try again later." },
        { status: 500 }
      );
    }
  };
