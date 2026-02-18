# Installation

## Prérequis

- **PHP** 8.1 ou supérieur
- **Symfony** 6.4 ou 7.x (framework-bundle, twig-bundle)
- **keyboardman/filesystem-bundle** installé et configuré dans l’application, avec au minimum :
  - **GET** `/api/filesystem/list` (paramètres : `filesystem`, optionnel `type`, optionnel `sort`)
  - **POST** `/api/filesystem/upload`, `/api/filesystem/upload-multiple`, `/api/filesystem/rename`, `/api/filesystem/move`, `/api/filesystem/delete`, `/api/filesystem/create-directory` (paramètres : `filesystem`, `path` — chemin complet du nouveau dossier)

## Étapes

### 1. Installation Composer

Si le bundle n’est pas sur Packagist, ajoutez le dépôt dans `composer.json` :

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/keyboardman/filemanager-bundle"
        }
    ]
}
```

Puis :

```bash
composer require keyboardman/filemanager-bundle
```

### 2. Enregistrement du bundle

Dans `config/bundles.php` :

```php
return [
    // ...
    Keyboardman\FilemanagerBundle\KeyboardmanFilemanagerBundle::class => ['all' => true],
];
```

### 3. Chargement des routes

Dans `config/routes.yaml` (ou équivalent) :

```yaml
keyboardman_filemanager:
    resource: '@KeyboardmanFilemanagerBundle/Resources/config/routes.yaml'
```

L’interface est alors disponible à l’URL **/filemanager**.

### 4. Installation des assets (CSS, JS)

Les assets du bundle (CSS, JavaScript) sont livrés dans `Resources/public/`. Pour les exposer dans l’application, exécutez la commande Symfony :

```bash
php bin/console assets:install
```

Cela copie les fichiers vers `public/bundles/keyboardmanfilemanager/`. En développement, vous pouvez utiliser des symlinks pour éviter de recopier à chaque mise à jour :

```bash
php bin/console assets:install --symlink
```

### 5. Sécurité (production)

- Protéger la route `/filemanager` (firewall, authentification).
- Protéger les routes `/api/filesystem/*` de la même manière.
- Ne pas exposer l’interface en public sans contrôle d’accès.
