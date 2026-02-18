# Change: Sélecteur File Manager pour Symfony Form (champ + bouton + modale iframe)

## Why

Les applications ont souvent besoin de sélectionner un fichier existant (dans le filesystem géré par `keyboardman/filesystem-bundle`) et de stocker sa clé/son chemin dans un champ de formulaire. Aujourd’hui, l’UI `/filemanager` existe comme page autonome, mais il manque un **widget de formulaire** et un **mode “picker”** (sélection) intégrable dans une modale via iframe.

## What Changes

- Ajout d’un **Symfony `FormType`** (champ texte + bouton groupés) qui ouvre une **modale** contenant un **iframe** vers l’UI du file manager.
- Ajout d’un **mode “picker”** côté UI file manager (dans l’iframe) permettant de sélectionner un fichier et de **retourner la valeur** au parent.
- Support de **plusieurs champs** “picker” sur une même page via un **canal (channel) unique** par instance (évite les collisions).
- Définition d’un protocole d’échange simple basé sur `window.postMessage` entre l’iframe et la page parente.

## Impact

- **Specs affectées** : nouvelles capacités `filemanager-picker` et `filemanager-form-picker`.
- **Code affecté** :
  - UI file manager (`src/Resources/views/manager.html.twig`, `src/Resources/assets/js/manager.js`) pour le mode picker.
  - Bundle Symfony (nouveau `FormType`, theme Twig optionnel, JS “picker modal”).
  - Documentation + démo d’intégration.

