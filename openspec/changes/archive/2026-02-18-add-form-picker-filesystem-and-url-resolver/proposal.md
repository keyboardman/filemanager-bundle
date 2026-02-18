# Change: Form picker – valeur avec filesystem et résolution d’URL absolue

## Why

Quand le champ du form picker est rempli après sélection d’un fichier, seule la clé/chemin est stockée : le **filesystem** (ex. `default`, `s3`) n’est pas indiqué. On ne peut donc pas savoir sur quel stockage se trouve le fichier ni générer une URL d’accès. Il manque aussi une **fonction** pour obtenir l’URL absolue à partir d’une valeur au format `<filesystem>:<path>`.

## What Changes

- La valeur du champ picker devient **`<filesystem>:<path>`** (ex. `s3:uploads/photo.jpg`). Si le filesystem est le `default`, on peut stocker `default:path` ou, pour compatibilité ascendante, accepter une valeur existante sans préfixe en la traitant comme `default:<path>`.
- Le file manager en mode picker envoie dans le **postMessage** le `filesystem` en plus du `path`.
- Le widget (JS) du form picker remplit l’input avec cette valeur combinée `filesystem:path`.
- Le bundle fournit une **fonction (service PHP + option Twig)** qui, à partir d’une chaîne `filesystem:path`, retourne l’**URL absolue** pour accéder au fichier. La stratégie de résolution (route applicative, CDN, etc.) est **configurable** par l’application.
- Le **FormType** permet de définir si la valeur du champ doit être le **path** (`filesystem:path`) ou l’**URL absolue** (via une option, ex. `value_type` = `path` | `url`).

## Impact

- **Specs affectées** : `filemanager-form-picker`, `filemanager-picker`.
- **Code affecté** : `FileManager.jsx` (postMessage avec `filesystem`), `picker.js` (écriture selon `value_type`), `FilemanagerPickerType.php` (option `value_type` path|url, éventuel DataTransformer pour url), nouveau service de résolution d’URL + config + Twig (optionnel), documentation `docs/form-picker.md` et usage de l’URL ; **page démo** `/demo-picker` (deux champs illustrant path et URL).
