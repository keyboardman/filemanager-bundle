# Change: Docker Compose avec MinIO pour tester stockage local et S3

## Why

Permettre de valider le file manager avec à la fois un stockage local (Flysystem Local) et un stockage S3-compatible (MinIO) sans déployer sur un vrai AWS, en utilisant un environnement Docker reproductible.

## What Changes

- Ajout d’un service MinIO dans `docker-compose.yml` (API S3 + console web).
- Configuration optionnelle de la démo pour un filesystem S3 pointant vers MinIO (bucket dédié, credentials via variables d’environnement).
- Conservation du filesystem local existant ; possibilité de lancer la démo en mode « local uniquement » ou « local + S3 » selon la config / le profil.
- Documentation dans `docs/docker.md` : commandes pour démarrer MinIO, variables d’environnement, et comment basculer entre local et S3 pour les tests.

## Impact

- Affected specs: nouvelle capacité `demo-infrastructure`.
- Affected code: `docker-compose.yml`, `demo/config/packages/flysystem_adapter.yaml` (ou fichiers dérivés/env), `demo/config/packages/keyboardman_filesystem.yaml`, `docs/docker.md`, éventuellement `Dockerfile.demo` si dépendances S3 (ex. `league/flysystem-aws-s3-v3` ou `async-aws/s3`) sont ajoutées pour la démo.
