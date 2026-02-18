## 1. Valeur du champ et postMessage

- [x] 1.1 Dans le file manager (picker mode), inclure `filesystem` dans le payload du `postMessage` envoyé au parent (`keyboardman.filemanager.picked`).
- [x] 1.2 Ajouter au FormType une option `value_type` : `path` (défaut) ou `url`. Exposer cette option au widget via une variable Twig / `data-value-type`.
- [x] 1.3 Dans le widget picker (JS), à la réception du message, remplir l’input selon `value_type` : si `path`, valeur `filesystem:path` ; si `url`, appeler l’endpoint de résolution d’URL du bundle (ou mécanisme équivalent) et remplir avec l’URL absolue.
- [x] 1.4 Documenter le format de valeur `filesystem:path`, l’option `value_type` et la compatibilité avec valeur existante sans préfixe dans `docs/form-picker.md`.

## 2. Résolution d’URL absolue

- [x] 2.1 Définir un service (ex. `FilemanagerUrlResolver`) qui expose une méthode prenant une chaîne `filesystem:path` et retournant une URL absolue (string). La résolution SHALL être configurable (ex. route name + params, ou callable injecté).
- [x] 2.2 Exposer cette résolution en Twig (ex. filtre ou fonction `filemanager_url(value)`) utilisant le même service.
- [x] 2.3 Documenter la configuration du résolveur et l’usage de la fonction/filtre Twig dans la doc (form-picker ou installation/usage).

## 3. Spécifications et tests

- [x] 3.1 Mettre à jour les specs selon les deltas (déjà reflété dans les fichiers sous `specs/` du change).
- [x] 3.2 Ajouter ou adapter les tests (FormType, controller, résolveur) pour le format `filesystem:path` et la résolution d’URL.

## 4. Démo

- [x] 4.1 Modifier la page démo picker (`/demo-picker`) pour illustrer les deux cas : un champ avec `value_type` = `path` (valeur `filesystem:path`), un champ avec `value_type` = `url` (valeur = URL absolue).
- [x] 4.2 Afficher clairement les valeurs soumises (path vs URL) dans le template de la démo.
