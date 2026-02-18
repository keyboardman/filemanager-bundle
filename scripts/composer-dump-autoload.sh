#!/bin/bash
set -e

# Script pour générer l'autoload optimisé
# Usage: ./scripts/composer-dump-autoload.sh [working_directory]

WORK_DIR="${1:-/app}"

echo "🔄 Génération de l'autoload optimisé dans ${WORK_DIR}..."

cd "${WORK_DIR}"

# Vérifier que composer.json existe
if [ ! -f "composer.json" ]; then
    echo "❌ Erreur: composer.json introuvable dans ${WORK_DIR}"
    exit 1
fi

# Générer l'autoload optimisé
composer dump-autoload --optimize

echo "✅ Autoload optimisé généré avec succès"
