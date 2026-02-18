# Design: Documentation intégration, sécurité API, URL S3

## Context

- Le bundle filemanager s’appuie sur keyboardman/filesystem-bundle et expose une UI (React) qui appelle une API filesystem (list, upload, rename, delete, etc.).
- La sécurité des routes `/filemanager`, `/filemanager/resolve-url` et `/api/filesystem/*` est actuellement mentionnée de façon générique (installation.md, README) sans détailler token vs auth utilisateur.
- La résolution d’URL (`url_route`, `FilemanagerUrlResolver`) pointe aujourd’hui vers une route applicative qui sert le fichier (stream). Pour S3, une alternative est d’exposer une **URL S3 publique** (bucket public ou URL sans expiration) au lieu de passer par un contrôleur qui stream le fichier.

## Goals / Non-Goals

- **Goals** : Documenter (1) l’intégration du bundle, (2) la sécurisation de l’API (token ou auth utilisateur), (3) le cas URL S3 publique sans expiration.
- **Non-Goals** : Implémenter dans le bundle un mécanisme de token ou d’auth (reste dans l’application) ; implémenter la génération d’URL S3 dans le bundle (stratégie configurable côté app).

## Decisions

- **Documentation d’intégration** : Un seul document (ou section) qui regroupe prérequis, installation, configuration minimale, et pointe vers les docs existantes (form-picker, usage, etc.).
- **Sécurité API** : Documenter deux options sans les coder dans le bundle :
  - **Token** : l’application protège les routes (filemanager + API filesystem) en exigeant un token (header ou query), et transmet ce token au front (ex. query param pour l’iframe du picker). Le bundle n’a pas de notion de token ; c’est l’app qui vérifie le token dans un listener ou un firewall personnalisé.
  - **Auth utilisateur** : firewall Symfony classique (form_login, etc.) ; seules les utilisateurs authentifiés accèdent à `/filemanager` et `/api/filesystem/*`. Documenter un exemple de `security.yaml` et `access_control`.
- **URL S3 publique sans expiration** : Documenter que l’application peut configurer une stratégie de résolution d’URL qui renvoie une URL S3 publique (bucket public ou politique bucket sans expiration) au lieu d’une route qui stream le fichier. Le bundle fournit déjà un résolveur configurable (`url_route` ou callable) ; la doc décrit comment, pour un filesystem S3, l’app peut générer cette URL (ex. service custom qui appelle le SDK S3 pour une URL publique).

## Risks / Trade-offs

- Risque de surcharge de la doc : on garde les exemples courts et on renvoie vers la doc Symfony / AWS pour les détails.
- Pas de code dans le bundle pour le token : évite de figer un schéma (header name, query param) et laisse chaque projet choisir.

## Migration Plan

- Aucune migration : ajout de documentation uniquement.

## Open Questions

- Aucun.
