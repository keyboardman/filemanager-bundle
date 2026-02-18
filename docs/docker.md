# Docker (MinIO uniquement)

Docker est utilisé **uniquement pour MinIO** afin de tester le stockage S3 en local. Les tests et la démo s'exécutent sur la machine hôte.

## Tests (sans Docker)

```bash
make test
# ou
./vendor/bin/phpunit
```

## Démo (sans Docker)

La démo utilise le serveur Symfony en local :

```bash
make install-demo   # une fois
make demo           # lance symfony serve dans demo/
```

Puis ouvrir **http://127.0.0.1:8000/filemanager** dans le navigateur.

## MinIO (stockage S3) avec Docker

Pour tester le file manager avec un stockage S3-compatible (sans AWS) :

1. **Démarrer MinIO** (Docker) :
   ```bash
   make minio
   # ou : docker compose up minio
   ```

2. **Configurer la démo** : dans `demo/.env`, décommenter et adapter les variables MinIO (pointant vers `http://localhost:9000` quand MinIO tourne en Docker) :
   ```env
   MINIO_ENDPOINT=http://localhost:9000
   MINIO_ACCESS_KEY=minioadmin
   MINIO_SECRET_KEY=minioadmin
   MINIO_BUCKET=filemanager-demo
   MINIO_REGION=us-east-1
   ```

3. **Créer le bucket** : ouvrir la console MinIO http://localhost:9001 (identifiants : `minioadmin` / `minioadmin`), puis Object Browser → Create bucket → `filemanager-demo`.

4. **Lancer la démo** : `make demo`, puis ouvrir le file manager (S3) : http://127.0.0.1:8000/filemanager?filesystem=s3

| Variable            | Description                    |
|---------------------|--------------------------------|
| `MINIO_ENDPOINT`    | URL de l'API S3 (localhost:9000 quand MinIO est dans Docker) |
| `MINIO_ACCESS_KEY`  | Clé d'accès                    |
| `MINIO_SECRET_KEY`  | Secret                         |
| `MINIO_BUCKET`      | Nom du bucket                  |
| `MINIO_REGION`      | Région (ex. `us-east-1`)       |

## Fichiers

- **docker-compose.yml** : service `minio` uniquement (API S3 + console).
- **Dockerfile** et **Dockerfile.demo** : conservés pour usage optionnel (CI, etc.) mais non requis pour le workflow local.
