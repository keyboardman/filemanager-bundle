# Design : Interface graphique File Manager

## Context

- **API existante** : keyboardman/filesystem-bundle expose sous `/api/filesystem` :
  - **GET** `/api/filesystem/list` : lister les fichiers (paramètres : `filesystem`, optionnel `type`, optionnel `sort`). Réponse : `{ "filesystem": "...", "paths": ["chemin1", "chemin2", ...] }`. Fichiers masqués (nom en `.`) exclus. Types par extension : image (jpg, png, gif, webp, svg, …), audio (mp3, wav, ogg, …), video (mp4, webm, avi, …).
  - **POST** : upload, upload-multiple, rename, move, delete.
- **Restrictions upload** (configurables) : types autorisés (image, audio, video), taille max par fichier (ex. 10 MiB) ; 400 si non conforme.
- **Objectif** : fournir une UI (header, sidebar, zone principale) pour naviguer, filtrer, trier et agir sur les fichiers via cette API.
- **Contraintes** : réutilisation maximale de l’API existante ; pas de duplication de la logique métier.

## Goals / Non-Goals

- **Goals** : UI lisible (chemin courant, filtres, tris, arborescence, liste dossiers/fichiers) ; appels à l’API filesystem pour list + actions (upload, rename, move, delete).
- **Non-Goals** : remplacer l’API keyboardman ; gérer l’authentification/autorisation (délégué à l’application) ; support hors navigateur (ex. CLI).

## Decisions

- **Listing** : utiliser **GET /api/filesystem/list** du bundle keyboardman. Paramètres : `filesystem` (défaut `default`), `type` (optionnel : `audio`, `video`, `image`), `sort` (optionnel : `asc`, `desc`). Réponse : `paths` (liste de chemins). L’UI envoie type et sort à l’API ; si l’API supporte un paramètre `path`/prefix pour limiter au répertoire courant, l’utiliser ; sinon dériver dossiers/fichiers et filtre par préfixe côté client à partir de `paths`.
- **Stack frontend** : choix laissé à l’implémentation (HTML/CSS/JS minimal, ou léger framework) ; privilégier simple et intégrable dans une app Symfony (Twig + assets ou page SPA).
- **Filtres** : « image », « vidéo », « audio » = passage du paramètre `type` à **GET /api/filesystem/list** ; « titre » = pas de filtre type (ou « tous ») + affichage par nom.
- **Tri** : « par nom asc/desc » = passage du paramètre `sort` à **GET /api/filesystem/list** (`asc` / `desc`).
- **Sidebar** : construite à partir des répertoires dérivés des `paths` (segments de chemin) ; entrée « .. » affichée quand le chemin courant n’est pas la racine.

## Risks / Trade-offs

- **Listing** : si l’API ne supporte pas un paramètre `path`, l’UI doit dériver l’arborescence à partir de tous les `paths` (et éventuellement filtrer par préfixe). Documenter le comportement selon la version de keyboardman/filesystem-bundle.
- **Sécurité** : l’UI et l’API list doivent être protégées par l’application (firewall, auth). Non géré dans ce design.

## Migration Plan

- Aucune migration : ajout de nouvelles routes et assets. Les apps qui n’utilisent pas le file manager ne sont pas impactées.

## Open Questions

- Préfixe des routes du file manager (ex. `/filemanager` ou réutilisation de `/api/filesystem`) à trancher en implémentation.
