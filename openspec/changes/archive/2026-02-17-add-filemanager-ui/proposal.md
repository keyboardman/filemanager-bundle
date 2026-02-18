# Change: Interface graphique pour le File Manager

## Why

L’API [keyboardman/filesystem-bundle](https://github.com/keyboardman/filesystem-bundle) expose des opérations (upload, rename, move, delete) mais aucune interface utilisateur. Une interface graphique permet d’explorer les fichiers, filtrer et trier, et d’utiliser l’API depuis le navigateur.

## What Changes

- **Header** : affichage du chemin courant, filtres (image, vidéo, audio, titre), tris (nom asc/desc).
- **Sidebar gauche** : arborescence des répertoires et entrée « .. » pour remonter au parent.
- **Zone principale** : liste des dossiers et fichiers du répertoire courant (avec appels à l’API pour les actions).
- Utilisation de l’**API list** keyboardman : **GET /api/filesystem/list** (`filesystem`, `type`, `sort`) pour alimenter sidebar et zone principale.
- Intégration avec les endpoints existants : list, upload, upload-multiple, rename, move, delete.

## Impact

- **Specs affectées** : nouvelle capacité `filemanager-ui`.
- **Code affecté** : nouveau frontend (assets, templates ou SPA), éventuellement contrôleur(s) et route(s) pour le listing et la page du file manager.
