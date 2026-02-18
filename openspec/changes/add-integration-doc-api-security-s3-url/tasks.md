## 1. Documentation d’intégration

- [x] 1.1 Rédiger ou étendre un document d’intégration (ex. `docs/integration.md` ou section dans `installation.md`) : prérequis, installation Composer, enregistrement du bundle, routes, assets, configuration minimale (`keyboardman_filemanager`), et liens vers form-picker, usage, résolution d’URL.
- [x] 1.2 S’assurer que la doc décrit clairement les routes à exposer (/filemanager, /filemanager/resolve-url, /api/filesystem/*) et le rôle de chacune.

## 2. Documentation sécurité API

- [x] 2.1 Documenter l’option **sécurisation par token** : comment protéger les routes (filemanager + API) avec un token (header ou query) ; comment passer le token au picker (iframe URL) ; exemple de listener ou firewall personnalisé (sans implémenter le mécanisme dans le bundle).
- [x] 2.2 Documenter l’option **sécurisation par authentification utilisateur** : exemple de `security.yaml` (firewall, access_control) pour restreindre /filemanager et /api/filesystem/* aux utilisateurs connectés.
- [x] 2.3 Mettre à jour le README et/ou installation.md pour pointer vers cette section sécurité.

## 3. Documentation URL S3 publique sans expiration

- [x] 3.1 Documenter le cas d’usage : lorsque les fichiers sont sur S3 et que l’on souhaite exposer une URL publique sans expiration (bucket public ou politique bucket).
- [x] 3.2 Expliquer comment l’application peut fournir cette URL : soit en configurant une stratégie de résolution (service custom, `url_route` vers un contrôleur qui renvoie une redirection ou l’URL S3 publique), soit en implémentant un résolveur callable qui utilise le SDK S3 pour générer l’URL publique.
- [x] 3.3 Préciser que le bundle ne génère pas lui-même l’URL S3 ; il s’appuie sur la configuration (`url_route` ou résolveur injecté) fournie par l’application.

## 4. Validation

- [x] 4.1 Relire la doc pour cohérence et liens internes.
- [x] 4.2 Vérifier que les exemples de configuration (YAML, PHP) sont valides et alignés avec le code actuel du bundle.
