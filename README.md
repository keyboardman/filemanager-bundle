# Keyboardman File Manager Bundle

Interface graphique pour l’API [keyboardman/filesystem-bundle](https://github.com/keyboardman/filesystem-bundle) : navigation, filtres (image, vidéo, audio), tri, sidebar avec répertoires, liste des dossiers/fichiers, upload, renommer, déplacer, supprimer.

## Prérequis

- PHP 8.1+
- Symfony 6.4, 7.x ou 8.x
- [keyboardman/filesystem-bundle](https://github.com/keyboardman/filesystem-bundle) installé et configuré, avec **GET /api/filesystem/list** (et endpoints POST) disponibles.

## Installation

1. **Composer** (dépôt à ajouter si besoin) :
   ```bash
   composer require keyboardman/filemanager-bundle
   ```

2. **Bundle** dans `config/bundles.php` :
   ```php
   Keyboardman\FilemanagerBundle\KeyboardmanFilemanagerBundle::class => ['all' => true],
   ```

3. **Routes** dans `config/routes.yaml` :
   ```yaml
   keyboardman_filemanager:
       resource: '@KeyboardmanFilemanagerBundle/Resources/config/routes.yaml'
   ```

4. **Assets** :
   ```bash
   php bin/console assets:install
   ```

L’interface est accessible à **/filemanager**. En production, protégez `/filemanager`, `/filemanager/resolve-url` et `/api/filesystem/*`. Voir [Sécurisation de l’API](docs/security.md).

## Utilisation

- **Header** : chemin courant, filtre (Tous, Image, Vidéo, Audio), tri (Nom A→Z / Z→A).
- **Sidebar** : répertoires et « .. » ; **zone principale** : dossiers/fichiers, actions (renommer, déplacer, supprimer), upload.

L’API est appelée en relatif (base par défaut : `/api/filesystem`).

### Widget formulaire (picker)

FormType champ texte + bouton « Parcourir » : modale avec file manager en iframe, valeur = `filesystem:path` ou URL absolue. Voir [Widget formulaire (picker)](docs/form-picker.md).

## Tests

```bash
composer install
make test
# ou
./vendor/bin/phpunit
```

Voir [docs/testing.md](docs/testing.md).

## Développement – Démo en local

1. **Une fois** : `make install-demo`
2. **Démarrer** : `make demo` → http://127.0.0.1:8000/filemanager
3. **Rebuild assets** (autre terminal) : `make watch`

Voir `make help`. [Symfony CLI](https://symfony.com/download) requise pour `make demo`.

## Docker (MinIO)

Pour tester le stockage S3 en local : `make minio` (ou `docker compose up minio`). Voir [docs/docker.md](docs/docker.md).

## Documentation

| Document | Contenu |
|----------|---------|
| [Installation et configuration](docs/installation.md) | Prérequis, installation, routes, assets, configuration (`url_route`, `available_filesystems`, `s3_filesystems`) |
| [Sécurisation de l’API](docs/security.md) | Token ou authentification utilisateur (firewall Symfony) |
| [URL S3 (publique ou pré-signée)](docs/s3-public-url.md) | Détection S3 (`S3FilesystemDetector`), URL publique ou redirection pré-signée |
| [Widget formulaire (picker) et Twig](docs/form-picker.md) | FormType, `value_type`, `filemanager_url()`, `FilemanagerUrlResolver` |
| [API Platform : retourner l’URL](docs/api-platform.md) | Exposer l’URL résolue (en fonction du filesystem) dans les réponses API (DTO, Normalizer) |
| [Utilisation de l’interface](docs/usage.md) | Header, sidebar, actions du file manager |
| [Assets (build Webpack)](docs/assets.md) | CSS, JS, build |
| [Tests](docs/testing.md) | Structure des tests |
| [Docker (MinIO)](docs/docker.md) | MinIO pour S3 en local |

## Licence

MIT.
