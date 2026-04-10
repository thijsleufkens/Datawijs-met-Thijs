import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { oordeel, geleerd, screenshotFilenames } = body;

  const review = await prisma.review.create({
    data: {
      oordeel,
      geleerd,
      besluitId: id,
      screenshots: {
        create: (screenshotFilenames as string[]).map((filename: string) => ({
          filename,
          type: "review",
          besluitId: id,
        })),
      },
    },
    include: { screenshots: true },
  });

  await prisma.besluit.update({
    where: { id },
    data: { status: "gereviewd" },
  });

  return NextResponse.json(review, { status: 201 });
}
