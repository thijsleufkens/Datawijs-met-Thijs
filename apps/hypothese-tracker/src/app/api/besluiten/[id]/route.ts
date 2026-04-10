import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const besluit = await prisma.besluit.findUnique({
    where: { id },
    include: {
      kpiLabels: { include: { kpi: true } },
      screenshots: true,
      review: { include: { screenshots: true } },
    },
  });

  if (!besluit) {
    return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  }

  return NextResponse.json(besluit);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.besluit.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
