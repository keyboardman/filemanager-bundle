# Installation et configuration

← [Retour à la documentation](../README.md#documentation)

## Prérequis

- **PHP** 8.1 ou supérieur  
- **Symfony** 6.4 ou 7.x (`framework-bundle`, `twig-bundle`, `form`)  
- **[keyboardman/filesystem-bundle](https://github.com/keyboardman/filesystem-bundle)** installé et configuré, avec au minimum :
  - **GET** `/api/filesystem/list` (paramètres : `filesystem`, optionnel `type`, optionnel `sort`)
  - **POST** `/api/filesystem/upload`, `upload-multiple`, `rename`, `move`, `delete`, `create-directory`

---

## 1. Installation Composer

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

## 2. Enregistrement du bundle

Dans `config/bundles.php` :

```php
return [
    // ...
    Keyboardman\FilemanagerBundle\KeyboardmanFilemanagerBundle::class => ['all' => true],
];
```

---

## 3. Routes

Dans `config/routes.yaml` (ou équivalent) :

```yaml
keyboardman_filemanager:
    resource: '@KeyboardmanFilemanagerBundle/Resources/config/routes.yaml'
```

Le bundle enregistre deux routes. L’API filesystem est fournie par votre application (keyboardman/filesystem-bundle) :

| Route | Méthode | Rôle |
|-------|---------|------|
| `/filemanager` | GET | Page de l’interface du file manager (navigation, upload, etc.). |
| `/filemanager/resolve-url` | GET | Résolution d’une valeur `filesystem:path` en URL absolue (utilisée par le form picker en `value_type` = `url` et pour la prévisualisation). |
| `/api/filesystem/*` | GET/POST | API filesystem (list, upload, upload-multiple, rename, delete, create-directory). **Non fournie par ce bundle** : à exposer par votre application via [keyboardman/filesystem-bundle](https://github.com/keyboardman/filesystem-bundle). |

En production, ces routes doivent être protégées. Voir [Sécurisation de l’API](security.md).

---

## 4. Assets (CSS, JS)

Les assets sont dans `Resources/public/`. Pour les exposer :

```bash
php bin/console assets:install
```

Ils sont copiés dans `public/bundles/keyboardmanfilemanager/`. En développement :

```bash
php bin/console assets:install --symlink
```

---

## 5. Configuration du bundle

Fichier : `config/packages/keyboardman_filemanager.yaml`

```yaml
keyboardman_filemanager:
    # Route utilisée pour générer l’URL d’un fichier (paramètres : filesystem, path).
    # Requis pour le form picker en value_type = url et pour la fonction Twig filemanager_url().
    url_route: null   # ex. : app_serve_file

    # Liste des filesystems affichés dans le sélecteur du file manager.
    # N’indiquer que les filesystems réellement configurés (évite l’erreur « Unknown filesystem »).
    available_filesystems: ['default', 's3']
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `url_route` | `string` ou `null` | `null` | Nom de la route qui sert le fichier (paramètres : `filesystem`, `path`). Si `null`, la résolution d’URL est désactivée. |
| `available_filesystems` | `list<string>` | `['default', 's3']` | Noms des filesystems proposés dans le file manager (dropdown « Stockage »). |

**Exemple** avec une route applicative qui sert les fichiers :

```yaml
keyboardman_filemanager:
    url_route: app_serve_file
    available_filesystems: ['default']
```

---

## 6. Sécurité (production)

- Protéger la route **/filemanager** (firewall, authentification).
- Protéger **/filemanager/resolve-url** et les routes **/api/filesystem/***.
- Ne pas exposer l’interface en public sans contrôle d’accès.

Pour des exemples concrets (token ou authentification utilisateur), voir [Sécurisation de l’API](security.md).

---

## Voir aussi

- [Widget formulaire (picker) et résolution d’URL](form-picker.md) — FormType, `value_type`, `filemanager_url()`, `FilemanagerUrlResolver`
- [Utilisation de l’interface](usage.md) — header, sidebar, actions du file manager
- [Sécurisation de l’API](security.md) — token, authentification utilisateur
- [URL S3 publique sans expiration](s3-public-url.md) — exposer des fichiers S3 via une URL publique
