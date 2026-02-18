# Design : File Manager en React

## Context

- **API existante** : GET /api/filesystem/list, POST upload, upload-multiple, rename, move, delete, create-directory (keyboardman/filesystem-bundle)
- **Implémentation actuelle** : Vanilla JS (manager.js), `fetch`, HTML/Twig avec IDs pour le ciblage DOM
- **Objectif** : Réécrire le client en React avec Axios et React-Bootstrap tout en conservant la même surface fonctionnelle et l’intégration Symfony/Twig

## Goals / Non-Goals

- **Goals** : App React montée sur un root div ; appels API via Axios ; UI basée sur React-Bootstrap ; compatibilité avec le mode picker (iframe) et le widget form picker existant
- **Non-Goals** : Modifier l’API backend ; toucher au widget picker (modal iframe) ; migrer le form picker en React

## Decisions

- **Stack frontend** : React 18+, Axios, React-Bootstrap
- **Entrée** : `manager.entry.js` crée une racine React et monte l’app sur `.layout` (ou un div dédié) avec les props lues depuis les data-attributes du layout
- **API** : Un service ou hook Axios pour centraliser les appels (list, upload, rename, delete, create-directory) ; base URL et filesystem lus depuis les props
- **UI** : React-Bootstrap (Container, Row, Col, Modal, Button, Form, Nav, ListGroup, etc.) ; styles personnalisés via CSS ou classes Bootstrap
- **Routing / navigation** : Reste piloté par l’état React (path courant, filtres, tri) ; mise à jour de l’URL via `history.replaceState` comme actuellement

## Risks / Trade-offs

- **Taille du bundle** : React + React-Bootstrap + Axios augmentent la taille. → Utiliser le build production et le code splitting si besoin.
- **Compatibilité Symfony** : Le Twig doit fournir un élément avec data-attrs ; le script manager.js (compilé) reste chargé après. Pas de rupture.

## Migration Plan

1. Ajouter les dépendances React, Axios, React-Bootstrap
2. Configurer Webpack/Encore pour React (.jsx, Babel)
3. Réécrire manager.js en composants React, en conservant la même logique fonctionnelle
4. Adapter manager.html.twig pour un seul root div + data-attrs
5. Vérifier le mode picker et l’intégration form picker
6. Supprimer ou archiver l’ancien manager.js vanilla

## Open Questions

- Préférer un point d’entrée unique `manager.jsx` ou une structure multi-fichiers (components/, hooks/, services/) ?
