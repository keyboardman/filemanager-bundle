#!/bin/sh
set -e

# Script pour construire les assets npm
# Usage: ./scripts/npm-build.sh [working_directory]

WORK_DIR="${1:-/app}"

echo "🔨 Construction des assets npm dans ${WORK_DIR}..."

cd "${WORK_DIR}"

# Vérifier que package.json existe
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json introuvable dans ${WORK_DIR}"
    exit 1
fi

# Construire les assets
npm run build

echo "✅ Assets npm construits avec succès"
