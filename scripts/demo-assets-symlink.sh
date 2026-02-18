#!/bin/sh
# Crée un symlink dans demo/public/bundles vers les assets du bundle.
# Ainsi, quand vous modifiez le JS et lancez `npm run watch`, la démo sert
# directement les fichiers buildés sans recopier.
# À lancer depuis la racine du dépôt (filemanager-bundle).

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEMO="${ROOT}/demo"
BUNDLES="${DEMO}/public/bundles"
TARGET="keyboardmanfilemanager"
# Chemin relatif depuis demo/public/bundles vers le bundle (installé en path)
LINK_TARGET="../../vendor/keyboardman/filemanager-bundle/src/Resources/public"

if [ ! -d "${DEMO}/vendor/keyboardman/filemanager-bundle" ]; then
  echo "❌ Exécutez d'abord: cd demo && composer install"
  exit 1
fi

mkdir -p "${BUNDLES}"
if [ -e "${BUNDLES}/${TARGET}" ]; then
  rm -rf "${BUNDLES}/${TARGET}"
fi
ln -sf "${LINK_TARGET}" "${BUNDLES}/${TARGET}"
echo "✅ Symlink créé: demo/public/bundles/${TARGET} -> ${LINK_TARGET}"
echo "   Les modifications du build JS seront visibles sur la démo (rafraîchir la page)."
