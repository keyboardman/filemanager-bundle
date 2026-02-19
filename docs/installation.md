# Installation et configuration

← [Retour à la documentation](../README.md#documentation)

Ce guide décrit comment intégrer le bundle dans une application Symfony : prérequis, installation, routes, assets et configuration.

---

## En bref

1. **Prérequis** : PHP 8.1+, Symfony 6.4 | 7.x | 8.x, [keyboardman/filesystem-bundle](https://github.com/keyboardman/filesystem-bundle) avec l’API exposée.
2. **Installation** : `composer require keyboardman/filemanager-bundle`, enregistrement du bundle, chargement des routes, `php bin/console assets:install`.
3. **Configuration** : `config/packages/keyboardman_filemanager.yaml` — au minimum `available_filesystems` ; pour le picker en URL absolue et la résolution d’URL : `url_route`.
4. **Sécurité** : protéger `/filemanager`, `/filemanager/resolve-url` et `/api/filesystem/*` (voir [Sécurisation de l’API](security.md)).

---

## 1. Prérequis

- **PHP** 8.1 ou supérieur  
- **Symfony** 6.4, 7.x ou 8.x (`framework-bundle`, `twig-bundle`, `form`)  
- **[keyboardman/filesystem-bundle](https://github.com/keyboardman/filesystem-bundle)** installé et configuré, avec au minimum :
  - **GET** `/api/filesystem/list` (paramètres : `filesystem`, optionnel `type`, optionnel `sort`)
  - **POST** `/api/filesystem/upload`, `upload-multiple`, `rename`, `move`, `delete`, `create-directory`

---

## 2. Installation Composer

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

---

## 3. Enregistrement du bundle

Dans `config/bundles.php` :

```php
return [
    // ...
    Keyboardman\FilemanagerBundle\KeyboardmanFilemanagerBundle::class => ['all' => true],
];
```

---

## 4. Routes

Dans `config/routes.yaml` (ou équivalent) :

```yaml
keyboardman_filemanager:
    resource: '@KeyboardmanFilemanagerBundle/Resources/config/routes.yaml'
```

### Routes exposées

| Route | Méthode | Rôle |
|-------|---------|------|
| `/filemanager` | GET | Page de l’interface du file manager (navigation, upload, etc.). |
| `/filemanager/resolve-url` | GET | Résolution `filesystem:path` → URL absolue (form picker `value_type` = `url`, prévisualisation). Paramètres : `filesystem`, `path`. |
| `/api/filesystem/*` | GET/POST | API filesystem (list, upload, rename, delete, create-directory). **Fournie par votre application** via [keyboardman/filesystem-bundle](https://github.com/keyboardman/filesystem-bundle), pas par ce bundle. |

En production, toutes ces routes doivent être protégées. Voir [Sécurisation de l’API](security.md).

---

## 5. Assets (CSS, JS)

Les assets sont dans `Resources/public/`. Pour les exposer :

```bash
php bin/console assets:install
```

Ils sont copiés dans `public/bundles/keyboardmanfilemanager/`. En développement :

```bash
php bin/console assets:install --symlink
```

---

## 6. Configuration du bundle

Fichier : `config/packages/keyboardman_filemanager.yaml`

```yaml
keyboardman_filemanager:
    # Nom de la route qui sert un fichier (paramètres : filesystem, path).
    # Requis pour value_type = url (picker), filemanager_url() et resolve-url.
    url_route: null   # ex. : app_serve_file

    # Filesystems proposés dans le file manager (dropdown « Stockage »).
    # N’indiquer que ceux réellement configurés (évite « Unknown filesystem »).
    available_filesystems: ['default', 's3']

    # Filesystems dont le stockage est S3 (ou compatible).
    # Utilisé par S3FilesystemDetector pour adapter le comportement (ex. redirection URL pré-signée).
    s3_filesystems: []   # ex. : ['s3']
```

### Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `url_route` | `string` ou `null` | `null` | Nom de la route qui sert le fichier (paramètres : `filesystem`, `path`). Si `null`, la résolution d’URL est désactivée. |
| `available_filesystems` | `list<string>` | `['default', 's3']` | Noms des filesystems affichés dans le file manager. |
| `s3_filesystems` | `list<string>` | `[]` | Noms des filesystems S3 (ou compatibles). Permet à l’app de les détecter via le service `S3FilesystemDetector`. |

### Exemple minimal (stockage local uniquement)

```yaml
keyboardman_filemanager:
    url_route: app_serve_file
    available_filesystems: ['default']
```

### Exemple avec S3

```yaml
keyboardman_filemanager:
    url_route: app_serve_file
    available_filesystems: ['default', 's3']
    s3_filesystems: ['s3']
```

---

## 7. Sécurité (production)

- Protéger **/filemanager** et **/filemanager/resolve-url**.
- Protéger **/api/filesystem/***.
- Ne pas exposer l’interface sans contrôle d’accès.

Exemples : [Sécurisation de l’API](security.md) (token ou authentification utilisateur).

---

## Voir aussi

- [Widget formulaire (picker) et résolution d’URL](form-picker.md)
- [API Platform : retourner l’URL en fonction du filesystem](api-platform.md)
- [Utilisation de l’interface](usage.md)
- [Sécurisation de l’API](security.md)
- [URL S3 (publique ou pré-signée)](s3-public-url.md)
