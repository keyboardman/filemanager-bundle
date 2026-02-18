# Change: Refactoriser le filemanager avec React, Axios et React-Bootstrap

## Why

L'interface actuelle du filemanager est implémentée en JavaScript vanilla avec `fetch`, rendant la maintenance et l'évolution difficiles. Une refonte en React avec Axios pour les appels API et React-Bootstrap pour l'UI permettra une meilleure structure, réutilisabilité et expérience de développement.

## What Changes

- Réécrire l'interface principale du file manager (header, sidebar, zone principale, filtres, upload, modale nouveau dossier) en React
- Remplacer les appels `fetch` par Axios pour la gestion de l'API filesystem
- Utiliser React-Bootstrap pour les composants UI (layout, modales, formulaires, boutons)
- Adapter la configuration Webpack (Encore) pour React
- Le template Twig conserve les data-attributes pour injecter la configuration dans le mount React
- Le widget picker (modal iframe) reste inchangé : il charge l’URL du filemanager en mode picker, dont le contenu sera désormais l’app React

## Impact

- Affected specs: `filemanager-ui`
- Affected code:
  - `src/Resources/assets/js/manager.js` → réécrit en composants React
  - `src/Resources/assets/js/manager.entry.js` → point d'entrée pour le mount React
  - `src/Resources/views/manager.html.twig` → simplifié (root div + data-attrs)
  - `package.json` → nouvelles dépendances (react, react-dom, axios, react-bootstrap)
  - `webpack.config.js` → configuration React (babel, .jsx)
