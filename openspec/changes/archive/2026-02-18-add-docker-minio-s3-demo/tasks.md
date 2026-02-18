# Tasks: add-docker-minio-s3-demo

## 1. Docker Compose et MinIO

- [x] 1.1 Ajouter le service `minio` dans `docker-compose.yml` (image officielle MinIO, volume persistant, ports API et console).
- [x] 1.2 Configurer le réseau pour que le service `demo` puisse joindre `minio` par hostname.
- [x] 1.3 Documenter dans `docs/docker.md` les commandes pour démarrer MinIO et accéder à la console (URL, credentials par défaut si applicable).

## 2. Configuration S3 dans la démo

- [x] 2.1 Ajouter la dépendance Flysystem S3 dans la démo (ex. `league/flysystem-aws-s3-v3` ou adaptateur basé sur `async-aws/s3`) via `demo/composer.json` ou `demo/composer.docker.json`.
- [x] 2.2 Déclarer un adaptateur Flysystem S3 (MinIO) dans `demo/config/packages/flysystem_adapter.yaml` (ou fichier dédié) utilisant les variables d’environnement (endpoint, key, secret, bucket).
- [x] 2.3 Ajouter un filesystem nommé (ex. `s3`) dans `demo/config/packages/keyboardman_filesystem.yaml` pointant vers cet adaptateur, en plus du `default` (local).
- [x] 2.4 Exposer le choix du filesystem dans l’UI ou la config de la démo pour que l’on puisse tester le file manager avec le filesystem `default` (local) ou `s3` (MinIO).

## 3. Documentation et validation

- [x] 3.1 Mettre à jour `docs/docker.md` : section MinIO (variables d’environnement, création du bucket, bascule local vs S3).
- [x] 3.2 Vérifier que `docker compose up demo` avec MinIO démarré permet de lister/uploader vers MinIO quand le filesystem S3 est sélectionné.
