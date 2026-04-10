/**
 * Database-initialisatie: past Prisma-migraties toe via better-sqlite3.
 * Draait bij het opstarten van de Docker-container, vóór de server start.
 * Houdt de _prisma_migrations-tabel bij zodat Prisma later niet klaagt.
 */
const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const dbPath = path.join(process.cwd(), "data", "hypothese-tracker.db");
const migrationsDir = path.join(process.cwd(), "prisma", "migrations");

// Zorg dat de data-directory bestaat
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Maak de _prisma_migrations-tabel aan als die nog niet bestaat
db.exec(`
  CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" VARCHAR(36) NOT NULL PRIMARY KEY,
    "checksum" VARCHAR(64) NOT NULL,
    "finished_at" DATETIME,
    "migration_name" VARCHAR(255) NOT NULL,
    "logs" TEXT,
    "rolled_back_at" DATETIME,
    "started_at" DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count" INTEGER UNSIGNED NOT NULL DEFAULT 0
  );
`);

// Welke migraties zijn al toegepast?
const applied = new Set(
  db
    .prepare(
      "SELECT migration_name FROM _prisma_migrations WHERE finished_at IS NOT NULL"
    )
    .all()
    .map((row) => row.migration_name)
);

// Lees migratie-directories en pas nieuwe toe
const migrationDirs = fs
  .readdirSync(migrationsDir)
  .filter((d) => fs.statSync(path.join(migrationsDir, d)).isDirectory())
  .sort();

let applied_count = 0;

for (const dir of migrationDirs) {
  if (applied.has(dir)) {
    continue;
  }

  const sqlPath = path.join(migrationsDir, dir, "migration.sql");
  if (!fs.existsSync(sqlPath)) continue;

  const sql = fs.readFileSync(sqlPath, "utf-8");
  const checksum = crypto.createHash("sha256").update(sql).digest("hex");

  console.log(`Migratie ${dir} toepassen...`);
  db.exec(sql);

  db.prepare(
    `INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, applied_steps_count)
     VALUES (?, ?, datetime('now'), ?, 1)`
  ).run(crypto.randomUUID(), checksum, dir);

  applied_count++;
  console.log(`Migratie ${dir} succesvol toegepast.`);
}

if (applied_count === 0) {
  console.log("Alle migraties waren al toegepast.");
} else {
  console.log(`${applied_count} migratie(s) toegepast.`);
}

db.close();
