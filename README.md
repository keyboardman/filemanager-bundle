# Keyboardman File Manager Bundle

Interface graphique pour l’API [keyboardman/filesystem-bundle](https://github.com/keyboardman/filesystem-bundle) : navigation, filtres (image, vidéo, audio), tri par nom, sidebar avec répertoires et « .. », liste des dossiers/fichiers, upload, renommer, déplacer, supprimer.

## Prérequis

- PHP 8.1+
- Symfony 6.4+ (ou 7.0+)
- [keyboardman/filesystem-bundle](https://github.com/keyboardman/filesystem-bundle) installé et configuré, avec la route **GET /api/filesystem/list** disponible.

## Installation

1. Déclarez le dépôt (si besoin) et installez le bundle :

```bash
composer require keyboardman/filemanager-bundle
```

2. Enregistrez le bundle dans `config/bundles.php` :

```php
return [
    // ...
    Keyboardman\FilemanagerBundle\KeyboardmanFilemanagerBundle::class => ['all' => true],
];
```

3. Installez les assets (CSS, JS) dans `public/` :

```bash
php bin/console assets:install
```

4. Chargez les routes du bundle dans `config/routes.yaml` :

```yaml
keyboardman_filemanager:
    resource: '@KeyboardmanFilemanagerBundle/Resources/config/routes.yaml'
```

L’interface sera accessible à l’URL **/filemanager**.

## Utilisation

- **Header** : chemin courant, filtre (Tous, Image, Vidéo, Audio), tri (Nom A→Z / Z→A). Les filtres et le tri sont envoyés à **GET /api/filesystem/list** (`type`, `sort`).
- **Sidebar** : répertoires dérivés des `paths` retournés par l’API ; entrée « .. » pour remonter au parent (masquée à la racine).
- **Zone principale** : liste des dossiers et fichiers du répertoire courant ; actions Renommer, Déplacer, Supprimer (POST vers l’API filesystem) ; barre d’upload (POST upload / upload-multiple).

L’API est appelée en relatif depuis la même origine (base par défaut : `/api/filesystem`). En production, protégez la route `/filemanager` et les routes `/api/filesystem/*`. Voir [Sécurisation de l’API](docs/security.md) (token ou authentification utilisateur).

### Widget formulaire (picker)

Un **FormType** permet d’afficher un champ texte + bouton « Parcourir » ; au clic, une modale ouvre le file manager en iframe pour sélectionner un fichier et renseigner le champ. Plusieurs champs peuvent coexister sur la même page. Voir [docs/form-picker.md](docs/form-picker.md).

## Tests

```bash
composer install
make test
# ou
./vendor/bin/phpunit
```

Voir [docs/testing.md](docs/testing.md) pour la structure des tests.

## Développement – Tester la démo en local (sans Docker)

Pour lancer l’application de démo avec **symfony serve** et voir les modifications JS en direct :

1. **Une fois** : installer les dépendances et lier les assets à la démo  
   ```bash
   make install-demo
   ```

2. **Démarrer la démo** (symfony serve sur http://127.0.0.1:8000)  
   ```bash
   make demo
   ```  
   Puis ouvrir http://127.0.0.1:8000/filemanager

3. **Dans un autre terminal** : rebuilder les assets à chaque modification  
   ```bash
   make watch
   ```  
   Les changements JS/CSS sont alors servis par la démo (symlink) ; il suffit de rafraîchir la page.

`make demo` utilise la [Symfony CLI](https://symfony.com/download) (`symfony serve`). Voir `make help` pour toutes les commandes.

## Docker (MinIO uniquement)

Docker sert uniquement à lancer **MinIO** pour tester le stockage S3 en local : `make minio` (ou `docker compose up minio`). Tests et démo s'exécutent en local. Voir [docs/docker.md](docs/docker.md).

## Documentation

- [Installation et configuration](docs/installation.md) — prérequis, installation, routes, assets, configuration du bundle
- [Sécurisation de l’API](docs/security.md) — token ou authentification utilisateur (firewall Symfony)
- [URL S3 publique sans expiration](docs/s3-public-url.md) — exposer des fichiers S3 via une URL publique
- [Widget formulaire (picker) et extension Twig](docs/form-picker.md) — FormType, options, `value_type`, fonction Twig `filemanager_url()`, service `FilemanagerUrlResolver`
- [Utilisation de l’interface](docs/usage.md) — file manager (header, sidebar, actions)
- [Assets (CSS, JS, build Webpack)](docs/assets.md)
- [Tests](docs/testing.md)
- [Docker (MinIO)](docs/docker.md)

## Licence

MIT.
