#!/bin/sh
set -e

echo "Database initialiseren..."
node prisma/db-init.js

# Seed alleen als de database leeg is
node -e "
const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(process.cwd(), 'data', 'hypothese-tracker.db');
const db = new Database(dbPath);
try {
  const row = db.prepare('SELECT COUNT(*) as count FROM Besluit').get();
  db.close();
  if (row.count === 0) {
    console.log('Database is leeg, seed-data aanmaken...');
    require('child_process').execSync('node prisma/seed.js', { stdio: 'inherit' });
  } else {
    console.log('Database bevat al ' + row.count + ' besluiten, seed overgeslagen.');
  }
} catch (e) {
  db.close();
  console.log('Seed-data aanmaken...');
  require('child_process').execSync('node prisma/seed.js', { stdio: 'inherit' });
}
"

echo "Server starten op poort ${PORT:-3000}..."
exec node server.js
