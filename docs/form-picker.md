# Widget formulaire (picker) et extension Twig

← [Retour à la documentation](../README.md#documentation)

Le bundle fournit un **FormType** (champ texte + bouton « Parcourir ») pour choisir un fichier via le file manager, et une **extension Twig** pour afficher l’URL d’un fichier à partir de la valeur du champ.

---

## Prérequis

- Symfony Form et thème Twig configurés
- Assets du picker (JS + CSS) chargés sur les pages qui utilisent le champ
- Pour `value_type` = `url` : `url_route` configuré (voir [Installation](installation.md#6-configuration-du-bundle))

---

## 1. Thème de formulaire

Dans `config/packages/twig.yaml` :

```yaml
twig:
    form_themes:
        - '@KeyboardmanFilemanager/Form/filemanager_picker_widget.html.twig'
```

---

## 2. Assets du picker

Sur toute page contenant un formulaire avec un champ filemanager picker :

```twig
{% block stylesheets %}
    {{ parent() }}
    <link rel="stylesheet" href="{{ asset('bundles/keyboardmanfilemanager/build/picker.css') }}">
{% endblock %}

{% block javascripts %}
    {{ parent() }}
    <script src="{{ asset('bundles/keyboardmanfilemanager/build/picker.js') }}"></script>
{% endblock %}
```

Les fichiers sont dans `public/bundles/keyboardmanfilemanager/build/` après `php bin/console assets:install`.

---

## 3. FormType `FilemanagerPickerType`

### Utilisation

```php
use Keyboardman\FilemanagerBundle\Form\FilemanagerPickerType;

$builder->add('filePath', FilemanagerPickerType::class, [
    'label'        => 'Fichier',
    'picker_url'   => '/filemanager',   // optionnel
    'button_label' => 'Parcourir…',      // optionnel
]);
```

Au clic sur « Parcourir », une modale s’ouvre avec le file manager en iframe ; l’utilisateur choisit un fichier et la valeur est renseignée dans le champ.

### Format de la valeur

La valeur dépend de l’option **`value_type`** :

| `value_type` | Valeur stockée | Exemple |
|--------------|----------------|---------|
| `path` (défaut) | `filesystem:path` | `default:uploads/photo.jpg`, `s3:uploads/file.pdf` |
| `url` | URL absolue du fichier | `https://example.com/serve/s3/uploads/photo.jpg` |

Avec `path`, le préfixe indique le stockage. Une valeur sans `:` est traitée comme `default:path` par le résolveur.

### Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `picker_url` | `string` | `'/filemanager'` | URL de la page file manager (mode picker). |
| `button_label` | `string` | `'Parcourir…'` | Libellé du bouton. |
| `value_type` | `'path'` ou `'url'` | `'path'` | `path` = `filesystem:path` ; `url` = URL absolue (nécessite `url_route`). |
| `resolve_url_route` | `string` | `'keyboardman_filemanager_resolve_url'` | Route pour résoudre `filesystem:path` en URL (utilisée quand `value_type` = `url`). |

### Exemple : champ en URL absolue

```php
$builder->add('fileUrl', FilemanagerPickerType::class, [
    'label'      => 'Fichier (URL)',
    'value_type' => 'url',
]);
```

La route de résolution et `url_route` doivent être configurés (voir [Installation](installation.md#6-configuration-du-bundle)).

### Plusieurs champs sur la même page

Chaque instance utilise un **channel** unique (dérivé de l’id du champ). Plusieurs pickers peuvent coexister sans conflit.

### Protocole postMessage (iframe → parent)

En mode picker, l’iframe envoie au parent :

- **type** : `keyboardman.filemanager.picked`
- **channel** : identifiant du widget
- **path** : chemin du fichier
- **filesystem** : nom du filesystem (ex. `default`, `s3`)

L’origin est vérifiée côté parent (`event.origin === window.location.origin`).

---

## 4. Extension Twig : `filemanager_url()`

Pour afficher un fichier ou un lien à partir d’une valeur `filesystem:path` :

```twig
<img src="{{ filemanager_url(form.filePath.vars.value) }}" alt="">

<a href="{{ filemanager_url('s3:uploads/document.pdf') }}">Télécharger</a>
```

**Prérequis** : `url_route` configuré. Si `url_route` est `null`, la fonction retourne une chaîne vide.

Une valeur sans `:` est traitée comme `default:path`.

---

## 5. Service PHP : `FilemanagerUrlResolver`

```php
use Keyboardman\FilemanagerBundle\Service\FilemanagerUrlResolver;

$url = $this->urlResolver->resolve('s3:uploads/photo.jpg');
// ex. : https://example.com/serve/s3/uploads/photo.jpg

[$filesystem, $path] = $this->urlResolver->parse('default:folder/file.txt');
// ['default', 'folder/file.txt']
```

- **`resolve(string $filesystemPath): string`** — URL absolue (ou `''` si `url_route` non configuré).
- **`parse(string $value): array`** — `[filesystem, path]` ; valeur sans `:` → `default:path`.

---

## Résumé

| Besoin | Solution |
|--------|----------|
| Champ pour choisir un fichier | `FilemanagerPickerType` + thème + assets picker |
| Valeur = filesystem + chemin | `value_type` = `path` (défaut) |
| Valeur = URL absolue | `value_type` = `url` + `url_route` configuré |
| Afficher l’URL en Twig | `filemanager_url(valeur)` |
| Résoudre en PHP | `FilemanagerUrlResolver::resolve()` / `parse()` |

---

## Voir aussi

- [Installation et configuration](installation.md)
- [API Platform : retourner l’URL](api-platform.md)
- [URL S3 (publique ou pré-signée)](s3-public-url.md)
- [Sécurisation de l’API](security.md)
