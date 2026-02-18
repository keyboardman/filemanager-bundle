#!/bin/bash
set -e

# Script pour installer les dépendances Composer
# Usage: ./scripts/composer-install.sh [working_directory]

WORK_DIR="${1:-/app}"

echo "📦 Installation des dépendances Composer dans ${WORK_DIR}..."

cd "${WORK_DIR}"

# Vérifier que composer.json existe
if [ ! -f "composer.json" ]; then
    echo "❌ Erreur: composer.json introuvable dans ${WORK_DIR}"
    exit 1
fi

# Installer les dépendances
php -d memory_limit=-1 /usr/bin/composer install \
    --no-interaction \
    --prefer-dist \
    --no-scripts

echo "✅ Dépendances Composer installées avec succès"
