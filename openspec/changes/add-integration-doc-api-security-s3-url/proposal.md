# Change: Documentation d’intégration, sécurisation API (token ou auth utilisateur), URL S3 publique sans expiration

## Why

Les intégrateurs du bundle ont besoin d’une doc claire pour installer et brancher le file manager, sécuriser l’API (token ou authentification utilisateur), et exposer des URLs S3 publiques sans expiration quand le stockage est S3.

## What Changes

- Ajout d’une documentation d’intégration du bundle (guide pas à pas, prérequis, configuration).
- Documentation de la sécurisation de l’API : option par **token** (ex. header ou query) et option par **authentification utilisateur** (firewall Symfony), avec exemples de configuration.
- Documentation du cas **URL S3 publique sans expiration** : quand le fichier est sur S3 et que l’application veut renvoyer une URL publique (bucket public ou URL pré-signée sans expiration / politique bucket), comment configurer le résolveur d’URL ou une route dédiée pour exposer cette URL.
- Aucun changement de code obligatoire : le bundle reste agnostique (sécurité et résolution d’URL restent à la charge de l’application). Les changements sont documentaires uniquement.

## Impact

- Affected specs: nouvelle capacité **documentation** (ou extension des docs existantes).
- Affected code: `docs/` (nouveaux ou mis à jour : intégration, sécurité API, URL S3).
