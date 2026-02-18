## 1. Intégration API list

- [x] 1.1 Consommer **GET /api/filesystem/list** (paramètres : `filesystem`, optionnel `type`, optionnel `sort`) pour récupérer les `paths` et alimenter la sidebar et la zone principale.
- [x] 1.2 Gérer l’absence éventuelle de paramètre `path` (dériver dossiers et répertoire courant à partir de `paths`, ex. filtrage par préfixe côté client).

## 2. Frontend – Structure et header

- [x] 2.1 Créer la page/layout du file manager (une URL dédiée, ex. `/filemanager` ou `/api/filesystem/manager`).
- [x] 2.2 Afficher le **chemin courant** dans le header (mise à jour à chaque navigation).
- [x] 2.3 Ajouter les **filtres** : image, vidéo, audio, titre/tous (dropdown ou boutons) et passer `type` à GET /api/filesystem/list (sauf « titre »/tous).
- [x] 2.4 Ajouter les **tris** : par nom asc / desc (dropdown ou boutons) et passer `sort=asc` ou `sort=desc` à GET /api/filesystem/list.

## 3. Frontend – Sidebar

- [x] 3.1 Afficher les **répertoires** dans la sidebar (à partir des `paths` retournés par GET /api/filesystem/list, en dérivant les dossiers).
- [x] 3.2 Afficher l’entrée **« .. »** pour remonter au répertoire parent lorsque le path n’est pas racine ; au clic, mettre à jour le path et recharger la liste.

## 4. Frontend – Zone principale

- [x] 4.1 Afficher la liste des **dossiers** et **fichiers** du répertoire courant (données de GET /api/filesystem/list, `paths`).
- [x] 4.2 Différencier visuellement dossiers et fichiers (icônes ou style).
- [x] 4.3 Brancher les actions (upload, rename, move, delete) sur l’API keyboardman (appels fetch/axios vers les endpoints existants) avec feedback succès/erreur.

## 5. Validation et documentation

- [x] 5.1 Vérifier le comportement avec au moins un filesystem (ex. local) et un scénario (naviguer, filtrer, trier, upload, rename, move, delete).
- [x] 5.2 Mettre à jour le README (ou la doc) avec l’URL de l’interface et les prérequis (keyboardman/filesystem-bundle avec GET /api/filesystem/list).
