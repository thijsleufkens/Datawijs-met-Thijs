#!/usr/bin/env bash
# Deploy pov.datawijs.nl: shipt de broncode naar Strongbad en bouwt daar de
# Docker-image. Geen data op de server: alle state leeft in de browser.
# Eenmalige NPM-stappen (proxy-host + cert): strongbad/setup_npm.py.
set -euo pipefail
export COPYFILE_DISABLE=1

# Server en poorten staan buiten de repo, in ~/.config/strongbad/deploy.env:
#   VPS=gebruiker@adres   SSH_PORT=...   CONTAINER_IP=...
ENV_FILE="${STRONGBAD_DEPLOY_ENV:-$HOME/.config/strongbad/deploy.env}"
[ -f "$ENV_FILE" ] || { echo "Mist $ENV_FILE (VPS, SSH_PORT, CONTAINER_IP)"; exit 1; }
# shellcheck disable=SC1090
. "$ENV_FILE"
: "${VPS:?zet VPS in $ENV_FILE}" "${SSH_PORT:?zet SSH_PORT in $ENV_FILE}" "${CONTAINER_IP:?zet CONTAINER_IP in $ENV_FILE}"
DEST="/opt/strongbad/pov-wizard"
cd "$(dirname "$0")"

# 1) Compose + NPM-script naar de dienstmap.
ssh -p "$SSH_PORT" "$VPS" "mkdir -p '$DEST'"
tar cf - -C strongbad --exclude='.DS_Store' . | ssh -p "$SSH_PORT" "$VPS" "tar xf - -C '$DEST'"

# 2) Broncode als app/ (oude eerst wissen zodat verwijderde bestanden niet blijven hangen).
tar cf - --exclude='.DS_Store' --exclude=node_modules --exclude=.next \
    --exclude=strongbad --exclude=deploy.sh . \
  | ssh -p "$SSH_PORT" "$VPS" \
      "rm -rf '$DEST/app' && mkdir -p '$DEST/app' && tar xf - -C '$DEST/app' && find '$DEST/app' -name '._*' -delete"

# 3) Bouwen en (her)starten. Docker Hub geeft soms een TLS-timeout: dan opnieuw draaien.
ssh -p "$SSH_PORT" "$VPS" "cd '$DEST' && CONTAINER_IP='$CONTAINER_IP' docker compose up -d --build"

echo "✓ Gedeployed: intern :8907, publiek https://pov.datawijs.nl (achter NPM access-list)"
