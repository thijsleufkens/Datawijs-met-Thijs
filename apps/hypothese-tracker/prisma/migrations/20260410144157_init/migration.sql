-- CreateTable
CREATE TABLE "Besluit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titel" TEXT NOT NULL,
    "datumBesluit" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actie" TEXT NOT NULL,
    "hypothese" TEXT NOT NULL,
    "reviewdatum" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "oordeel" TEXT NOT NULL,
    "geleerd" TEXT NOT NULL,
    "reviewdatumWerkelijk" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "besluitId" TEXT NOT NULL,
    CONSTRAINT "Review_besluitId_fkey" FOREIGN KEY ("besluitId") REFERENCES "Besluit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Screenshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "besluitId" TEXT,
    "reviewId" TEXT,
    CONSTRAINT "Screenshot_besluitId_fkey" FOREIGN KEY ("besluitId") REFERENCES "Besluit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Screenshot_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Kpi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "naam" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "BesluitKpi" (
    "besluitId" TEXT NOT NULL,
    "kpiId" TEXT NOT NULL,

    PRIMARY KEY ("besluitId", "kpiId"),
    CONSTRAINT "BesluitKpi_besluitId_fkey" FOREIGN KEY ("besluitId") REFERENCES "Besluit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BesluitKpi_kpiId_fkey" FOREIGN KEY ("kpiId") REFERENCES "Kpi" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_besluitId_key" ON "Review"("besluitId");

-- CreateIndex
CREATE UNIQUE INDEX "Kpi_naam_key" ON "Kpi"("naam");
