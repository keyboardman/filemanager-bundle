# Utilisation de l’interface File Manager

## Accès

Ouvrez dans le navigateur : **/filemanager** (ou l’URL de base de votre application + `/filemanager`).

## Header

- **Chemin courant** : affiche le répertoire actuellement affiché (ex. `/` ou `/documents/2024`). Se met à jour lors de la navigation.
- **Filtre** : liste déroulante (Tous, Image, Vidéo, Audio). Envoie le paramètre `type` à **GET /api/filesystem/list**.
- **Tri** : Nom A→Z (`sort=asc`) ou Nom Z→A (`sort=desc`), envoyé à l’API list.

## Sidebar (gauche)

- **« .. »** : remonte au répertoire parent. Visible uniquement lorsque le chemin courant n’est pas la racine.
- **Répertoires** : liste des sous-dossiers du répertoire courant, dérivée des `paths` retournés par l’API. Clic = navigation dans ce dossier.

## Zone principale

- **Dossiers** (icône dossier) : clic sur le nom = navigation dans le dossier.
- **Fichiers** (icône fichier) : actions disponibles :
  - **Renommer** : saisie du nouveau nom, POST `/api/filesystem/rename`.
  - **Déplacer** : saisie du chemin de destination, POST `/api/filesystem/move`.
  - **Supprimer** : confirmation puis POST `/api/filesystem/delete`.
- **Upload** : choix d’un ou plusieurs fichiers, bouton « Upload ». Envoi vers `/api/filesystem/upload` (un fichier) ou `/api/filesystem/upload-multiple`. Le champ `key` est rempli avec le chemin courant si vous n’êtes pas à la racine.

## Messages

- Succès (vert) ou erreur (rouge) après une action (upload, rename, move, delete). Les erreurs renvoyées par l’API (ex. type non autorisé, taille dépassée) sont affichées.

## Dépendance à l’API

L’interface ne stocke rien côté client : elle appelle **GET /api/filesystem/list** pour la liste et les paramètres `type` / `sort`, et dérive dossiers et fichiers à partir des `paths`. Les actions d’écriture passent par les endpoints POST du keyboardman/filesystem-bundle.
