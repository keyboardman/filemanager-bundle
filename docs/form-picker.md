# Widget Form : sélecteur de fichier (picker)

Le bundle fournit un type de champ Symfony Form qui associe un champ texte et un bouton « Parcourir ». Au clic, une modale s’ouvre avec un iframe vers le file manager en mode **picker** : l’utilisateur choisit un fichier et le chemin est renseigné dans le champ.

## Prérequis

- Symfony Form (le bundle déclare `symfony/form` en dépendance).
- Chargement des assets du picker (JS + CSS) sur les pages qui utilisent ce champ.

## 1. Thème de formulaire

Ajoutez le thème du widget dans votre configuration Twig pour que le champ s’affiche correctement (input + bouton groupés) :

```yaml
# config/packages/twig.yaml
twig:
    form_themes:
        - '@KeyboardmanFilemanager/Form/filemanager_picker_widget.html.twig'
```

## 2. Assets (JS + CSS)

Sur toute page contenant un formulaire avec un champ filemanager picker, incluez les assets du picker :

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

Après `php bin/console assets:install`, les fichiers se trouvent dans `public/bundles/keyboardmanfilemanager/build/`.

## 3. Utilisation du FormType

Dans votre formulaire, utilisez `FilemanagerPickerType` :

```php
use Keyboardman\FilemanagerBundle\Form\FilemanagerPickerType;

$builder->add('filePath', FilemanagerPickerType::class, [
    'label' => 'Fichier',
    'picker_url' => '/filemanager',      // optionnel, défaut : /filemanager
    'button_label' => 'Parcourir…',       // optionnel
]);
```

La valeur du champ est une **chaîne** (chemin/clé du fichier dans le filesystem).

## 4. Plusieurs champs sur la même page

Vous pouvez avoir plusieurs champs filemanager picker dans un même formulaire. Chaque instance utilise un **channel** unique (dérivé de l’id du champ) ; la modale et le message `postMessage` ciblent le bon champ.

## 5. Protocole postMessage (iframe → parent)

En mode picker, l’iframe du file manager envoie au parent :

- **type** : `keyboardman.filemanager.picked`
- **channel** : identifiant du widget
- **path** : chemin du fichier sélectionné

L’origin du message est vérifiée côté parent (`event.origin === window.location.origin`).

## 6. Options du FormType

| Option           | Type   | Défaut          | Description                          |
|------------------|--------|-----------------|--------------------------------------|
| `picker_url`     | string | `'/filemanager'`| URL de la page file manager (picker) |
| `button_label`   | string | `'Parcourir…'`  | Libellé du bouton                    |
