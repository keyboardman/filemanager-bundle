# Widget formulaire (picker) et extension Twig

← [Retour à la documentation](../README.md#documentation)

Le bundle fournit un **FormType** (champ texte + bouton « Parcourir ») et une **extension Twig** pour afficher l’URL d’un fichier à partir de la valeur du champ.

---

## Prérequis

- Symfony Form et thème Twig configuré
- Assets du picker (JS + CSS) chargés sur les pages qui utilisent le champ

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

Après `php bin/console assets:install`, les fichiers sont dans `public/bundles/keyboardmanfilemanager/build/`.

---

## 3. FormType `FilemanagerPickerType`

### Utilisation

```php
use Keyboardman\FilemanagerBundle\Form\FilemanagerPickerType;

$builder->add('filePath', FilemanagerPickerType::class, [
    'label'       => 'Fichier',
    'picker_url' => '/filemanager',   // optionnel
    'button_label' => 'Parcourir…',   // optionnel
]);
```

Au clic sur « Parcourir », une modale s’ouvre avec le file manager en iframe ; l’utilisateur choisit un fichier et la valeur est renseignée dans le champ.

### Format de la valeur

La valeur du champ dépend de l’option **`value_type`** :

| `value_type` | Valeur stockée | Exemple |
|--------------|----------------|---------|
| `path` (défaut) | `filesystem:path` | `default:uploads/photo.jpg`, `s3:bucket/file.pdf` |
| `url` | URL absolue du fichier | `https://example.com/serve/default/uploads/photo.jpg` |

Avec `path`, le préfixe indique le stockage (ex. `default`, `s3`). Une valeur sans `:` (ancien format) est traitée comme `default:path` par le résolveur d’URL.

### Options du FormType

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `picker_url` | `string` | `'/filemanager'` | URL de la page file manager (mode picker). |
| `button_label` | `string` | `'Parcourir…'` | Libellé du bouton. |
| `value_type` | `'path'` ou `'url'` | `'path'` | `path` = valeur `filesystem:path` ; `url` = URL absolue (nécessite `url_route` configuré). |
| `resolve_url_route` | `string` | `'keyboardman_filemanager_resolve_url'` | Route pour résoudre `filesystem:path` en URL (utilisée quand `value_type` = `url`). |

### Exemple : champ en URL absolue

```php
$builder->add('fileUrl', FilemanagerPickerType::class, [
    'label'      => 'Fichier (URL)',
    'value_type' => 'url',
]);
```

La route de résolution doit être configurée (voir [Installation – Configuration](installation.md#5-configuration-du-bundle)).

### Plusieurs champs sur la même page

Chaque instance utilise un **channel** unique (dérivé de l’id du champ). La modale et le message `postMessage` ciblent le bon champ ; plusieurs pickers peuvent coexister sans conflit.

### Protocole postMessage (iframe → parent)

En mode picker, l’iframe envoie au parent :

- **type** : `keyboardman.filemanager.picked`
- **channel** : identifiant du widget
- **path** : chemin du fichier
- **filesystem** : nom du filesystem (ex. `default`, `s3`)

L’origin est vérifiée côté parent (`event.origin === window.location.origin`).

---

## 4. Extension Twig : `filemanager_url()`

Pour afficher un fichier ou un lien à partir d’une valeur `filesystem:path` (ou d’un champ picker), le bundle expose la fonction Twig **`filemanager_url`**.

### Utilisation

```twig
{# À partir de la valeur d’un champ #}
<img src="{{ filemanager_url(form.filePath.vars.value) }}" alt="">

{# À partir d’une chaîne #}
<a href="{{ filemanager_url('s3:uploads/document.pdf') }}">Télécharger</a>
```

### Prérequis

- **`url_route`** doit être configuré dans `config/packages/keyboardman_filemanager.yaml` (voir [Installation – Configuration](installation.md#5-configuration-du-bundle)).
- Si `url_route` est `null`, la fonction retourne une chaîne vide.

### Rétrocompatibilité

Une valeur sans `:` (ancien format « path seul ») est traitée comme `default:path`.

---

## 5. Service PHP : `FilemanagerUrlResolver`

Pour résoudre une valeur `filesystem:path` en URL en PHP :

```php
use Keyboardman\FilemanagerBundle\Service\FilemanagerUrlResolver;

$url = $this->urlResolver->resolve('s3:uploads/photo.jpg');
// ex. : https://example.com/serve/s3/uploads/photo.jpg

[$filesystem, $path] = $this->urlResolver->parse('default:folder/file.txt');
// ['default', 'folder/file.txt']
```

- **`resolve(string $filesystemPath): string`** — retourne l’URL absolue (ou `''` si `url_route` non configuré).
- **`parse(string $value): array`** — retourne `[filesystem, path]` ; une valeur sans `:` est traitée comme `default:path`.

---

## 6. Résumé

| Besoin | Solution |
|--------|----------|
| Champ formulaire pour choisir un fichier | `FilemanagerPickerType` + thème + assets picker |
| Valeur = identifiant stockage + chemin | `value_type` = `path` (défaut) |
| Valeur = URL directe | `value_type` = `url` + config `url_route` |
| Afficher l’URL en Twig | `filemanager_url(valeur)` |
| Résoudre en PHP | `FilemanagerUrlResolver::resolve()` / `parse()` |
