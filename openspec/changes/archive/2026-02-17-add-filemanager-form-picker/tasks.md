## 1. Conception / contrats
- [x] 1.1 Définir les options du `FormType` (route, labels, valeur retournée, initial path, filtres) et le format du message `postMessage`.
- [x] 1.2 Ajouter une documentation d’intégration (exemple de form + inclusion des assets) et un exemple dans `demo/`.

## 2. UI file manager (mode picker)
- [x] 2.1 Étendre `FilemanagerQueryDto` et/ou le controller pour lire `picker` et `channel` depuis la query (sans casser le mode normal).
- [x] 2.2 Mettre à jour `manager.html.twig` pour exposer `data-picker` et `data-channel` sur `.layout`.
- [x] 2.3 Mettre à jour `manager.js` :
  - [x] détecter le mode picker
  - [x] désactiver/masquer les actions destructives en mode picker (rename/move/delete/upload)
  - [x] permettre la sélection d’un fichier et envoyer `postMessage` au parent

## 3. Symfony FormType + rendu + assets
- [x] 3.1 Ajouter un `FormType` (valeur = string) qui rend un champ texte + bouton groupés (via form theme Twig ou un block custom).x
- [x] 3.2 Ajouter un JS léger (bundle) qui :
  - [x] initialise toutes les instances sur la page
  - [x] ouvre une modale + iframe vers `/filemanager?picker=1&channel=...`
  - [x] écoute `message` et remplit le champ cible, puis ferme la modale
  - [x] gère plusieurs champs (channels uniques)
- [x] 3.3 Ajouter un CSS minimal pour la modale (overlay + dialog + iframe responsive).

## 4. Validation
- [x] 4.1 Ajouter des tests minimaux (ex. test de rendu du FormType, et test JS manuel documenté).
- [x] 4.2 Mettre à jour README/docs et vérifier le flow complet dans `demo/`.
