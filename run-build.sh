#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed or not in PATH."
  exit 1
fi

if docker compose version >/dev/null 2>&1; then
  COMPOSE_CMD=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE_CMD=(docker-compose)
else
  echo "Docker Compose is not available."
  exit 1
fi

COMPOSE_FILE="docker-compose.prod.yml"

echo "Using compose file: $COMPOSE_FILE"
echo "Stopping old containers..."
"${COMPOSE_CMD[@]}" -f "$COMPOSE_FILE" down --remove-orphans

echo "Building production image..."
"${COMPOSE_CMD[@]}" -f "$COMPOSE_FILE" build --pull

echo "Starting production stack..."
"${COMPOSE_CMD[@]}" -f "$COMPOSE_FILE" up -d

echo "Production stack status:"
"${COMPOSE_CMD[@]}" -f "$COMPOSE_FILE" ps

echo "Done. App should be available at http://localhost:3001"
