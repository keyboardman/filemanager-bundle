# Docker

## Tests

Construire l’image et lancer les tests PHPUnit :

```bash
docker build -t keyboardman/filemanager-bundle .
docker run --rm keyboardman/filemanager-bundle ./vendor/bin/phpunit
```

Avec docker-compose :

```bash
docker compose run --rm test
```

## Démo

L’image de démo embarque une application Symfony minimale (dossier `demo/`) avec keyboardman/filesystem-bundle et keyboardman/filemanager-bundle, et un adapter Flysystem local (`var/storage`).

**Build et run :**
```bash
docker build -f Dockerfile.demo -t keyboardman/filemanager-demo .
docker run --rm -p 8000:8000 keyboardman/filemanager-demo
```

Puis ouvrir **http://localhost:8000/filemanager** dans le navigateur.

**Avec docker-compose :**
```bash
docker compose up demo
# http://localhost:8000/filemanager
```

## Fichiers

- **Dockerfile** : image pour lancer les tests du bundle (CMD = phpunit).
- **Dockerfile.demo** : image pour la démo (app Symfony dans `demo/`, serveur PHP sur le port 8000).
- **docker-compose.yml** : services `test` (phpunit) et `demo` (serveur démo).
- **.dockerignore** : exclut `vendor/`, `var/`, `.git/` du contexte de build.
