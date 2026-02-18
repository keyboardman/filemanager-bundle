#!/bin/sh
set -e

# Script pour installer les dépendances npm
# Usage: ./scripts/npm-install.sh [working_directory]

WORK_DIR="${1:-/app}"

echo "📦 Installation des dépendances npm dans ${WORK_DIR}..."

cd "${WORK_DIR}"

# Vérifier que package.json existe
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json introuvable dans ${WORK_DIR}"
    exit 1
fi

# Installer les dépendances avec npm ci (clean install)
npm ci

echo "✅ Dépendances npm installées avec succès"
