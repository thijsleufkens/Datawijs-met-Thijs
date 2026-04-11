import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const kpi = searchParams.get("kpi");

  const besluiten = await prisma.besluit.findMany({
    where: kpi
      ? { kpiLabels: { some: { kpi: { naam: kpi } } } }
      : undefined,
    include: {
      kpiLabels: { include: { kpi: true } },
      review: true,
      screenshots: true,
    },
    orderBy: { datumBesluit: "desc" },
  });

  return NextResponse.json(besluiten);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { titel, datumBesluit, actie, hypothese, reviewdatum, kpiLabels, screenshotFilenames } = body;

  const besluit = await prisma.besluit.create({
    data: {
      titel,
      datumBesluit: new Date(datumBesluit),
      actie,
      hypothese,
      reviewdatum: new Date(reviewdatum),
      kpiLabels: {
        create: await Promise.all(
          (kpiLabels as string[]).map(async (naam: string) => {
            const kpi = await prisma.kpi.upsert({
              where: { naam },
              create: { naam },
              update: {},
            });
            return { kpiId: kpi.id };
          })
        ),
      },
      screenshots: {
        create: (screenshotFilenames as string[]).map((filename: string) => ({
          filename,
          type: "nulmeting",
        })),
      },
    },
    include: {
      kpiLabels: { include: { kpi: true } },
      screenshots: true,
    },
  });

  return NextResponse.json(besluit, { status: 201 });
}
