import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const kpis = await prisma.kpi.findMany({
    orderBy: { naam: "asc" },
  });

  return NextResponse.json(kpis);
}
