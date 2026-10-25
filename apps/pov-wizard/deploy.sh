#!/usr/bin/env bash
# Deploy pov.datawijs.nl: shipt de broncode naar Strongbad en bouwt daar de
# Docker-image. Geen data op de server: alle state leeft in de browser.
# Eenmalige NPM-stappen (proxy-host + cert): strongbad/setup_npm.py.
set -euo pipefail
export COPYFILE_DISABLE=1

PORT=59026
VPS="thijs@94.142.244.42"
DEST="/opt/strongbad/pov-wizard"
cd "$(dirname "$0")"

# 1) Compose + NPM-script naar de dienstmap.
ssh -p "$PORT" "$VPS" "mkdir -p '$DEST'"
tar cf - -C strongbad --exclude='.DS_Store' . | ssh -p "$PORT" "$VPS" "tar xf - -C '$DEST'"

# 2) Broncode als app/ (oude eerst wissen zodat verwijderde bestanden niet blijven hangen).
tar cf - --exclude='.DS_Store' --exclude=node_modules --exclude=.next \
    --exclude=strongbad --exclude=deploy.sh . \
  | ssh -p "$PORT" "$VPS" \
      "rm -rf '$DEST/app' && mkdir -p '$DEST/app' && tar xf - -C '$DEST/app' && find '$DEST/app' -name '._*' -delete"

# 3) Bouwen en (her)starten. Docker Hub geeft soms een TLS-timeout: dan opnieuw draaien.
ssh -p "$PORT" "$VPS" "cd '$DEST' && docker compose up -d --build"

echo "✓ Gedeployed: intern :8907, publiek https://pov.datawijs.nl (achter NPM access-list)"
