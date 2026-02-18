# Design: Docker Compose + MinIO pour démo local et S3

## Context

- La démo actuelle utilise uniquement un adaptateur Flysystem Local (`var/storage`).
- Le bundle s’appuie sur keyboardman/filesystem-bundle et League Flysystem ; les adaptateurs S3 existent (ex. league/flysystem-aws-s3-v3, async-aws/s3).
- MinIO expose une API S3-compatible et une console web, adaptée aux tests en local.

## Goals / Non-Goals

- **Goals** : fournir un `docker-compose` avec MinIO ; permettre de tester le file manager avec stockage local et avec un filesystem S3 (MinIO) sans changer le code du bundle ; documenter la procédure.
- **Non-Goals** : modifier le comportement du file manager lui-même ; supporter d’autres backends (GCS, Azure) dans cette proposition ; sécuriser MinIO pour la production (usage démo/dev uniquement).

## Decisions

- **MinIO en service séparé** : un service `minio` dans le même `docker-compose.yml` que `demo` et `test`, avec un volume pour la persistance des données et des ports exposés (API + console). La démo se connecte à MinIO via hostname `minio` (réseau Docker).
- **Configuration S3 optionnelle** : un second filesystem (ex. `s3`) configuré uniquement quand les variables d’environnement MinIO sont présentes (ou via un fichier env dédié `.env.minio` / section dans `.env`). Le filesystem `default` reste local pour ne pas casser le flux actuel.
- **Adaptateur Flysystem S3** : utilisation de `league/flysystem-aws-s3-v3` ou `async-aws/s3` + adaptateur Flysystem 3 dans la démo ; la dépendance est ajoutée uniquement dans `demo/composer.json` (ou composer.docker.json) pour ne pas imposer S3 au bundle principal.
- **Bucket et credentials** : bucket créé au premier lancement (script ou MC) ou via MinIO console ; credentials (endpoint, key, secret) passés par variables d’environnement et lus dans la config Symfony (paramètres → arguments de l’adaptateur).

## Risks / Trade-offs

- **Risque** : divergence entre config « locale » (sans Docker) et config Docker (MinIO). **Mitigation** : documenter les deux scénarios et utiliser des fichiers `.env.dist` / commentaires dans `.env`.
- **Trade-off** : un seul bucket MinIO pour la démo pour rester simple ; pas de multi-buckets dans cette proposition.

## Migration Plan

- Aucune migration applicative : ajout optionnel. Les projets qui n’utilisent pas MinIO gardent le comportement actuel (local uniquement).
- Rollback : retirer le service `minio` et la config S3 de la démo pour revenir au compose actuel.

## Open Questions

- Aucun pour le périmètre décrit.
