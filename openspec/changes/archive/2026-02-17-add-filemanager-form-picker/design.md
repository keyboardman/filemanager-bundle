## Context

- L’UI file manager est disponible via la route GET `/filemanager` (bundle) et consomme l’API `/api/filesystem/*` (bundle `keyboardman/filesystem-bundle`).
- Objectif : rendre l’UI utilisable en **iframe** pour **sélectionner** un fichier et renseigner un champ Symfony Form dans la page parente.
- Contrainte : il peut y avoir **plusieurs** champs “picker” sur la même page (même formulaire).

## Goals / Non-Goals

- **Goals**
  - Un `FormType` réutilisable qui affiche un champ texte et un bouton “Parcourir…”.
  - Ouverture d’une modale (overlay) avec un iframe pointant vers `/filemanager` en mode picker.
  - Un protocole stable de sélection utilisant `window.postMessage`.
  - Aucune collision entre plusieurs instances sur la même page.

- **Non-Goals**
  - Gestion de l’auth/ACL (délégué à l’application).
  - Transformation de la valeur en URL publique (on retourne une **clé/chemin** du filesystem).
  - Support avancé des champs dynamiques (ex. ajout via JS dans une collection) au-delà d’une initialisation simple (peut être ajouté plus tard).

## Decisions

- **Mode picker** :
  - Activé via query param (ex.) `?picker=1&channel=<id>` sur `/filemanager`.
  - Le template expose `data-picker` et `data-channel` sur `.layout` pour que `manager.js` ajuste l’UI.

- **Sélection d’un fichier** :
  - En mode picker, un clic sur une ligne “fichier” (ou un bouton “Sélectionner”) déclenche un message vers la fenêtre parente et n’exécute pas d’action destructive.

- **Protocole `postMessage`** :
  - L’iframe envoie :
    - `window.parent.postMessage({ type: 'keyboardman.filemanager.picked', channel, path }, window.location.origin)`
  - La page parente écoute `message` :
    - Vérifie `event.origin === window.location.origin`
    - Vérifie `event.data.type` et `event.data.channel`
    - Met à jour le champ associé, puis ferme la modale.

- **Support multi-champs** :
  - Chaque widget génère un `channel` unique (ex. UUID v4 ou token aléatoire court) stocké en `data-channel`.
  - Chaque bouton ouvre un iframe dont l’URL inclut ce `channel`, ce qui permet au parent de router le message vers le bon champ.

## Risks / Trade-offs

- `postMessage` implique une vérification stricte de l’origin pour éviter l’injection d’événements.
- L’UI en iframe doit rester simple : pas de dépendances JS externes, et une fermeture propre de la modale (bouton fermer, clic overlay, ESC).

## Migration Plan

- Ajout non breaking : nouvelles options et assets. Les applications qui n’utilisent pas le `FormType` ne sont pas impactées.

## Open Questions

- Nom exact du `FormType` (`FilemanagerPickerType` vs `FilemanagerPathType`) et options exposées.
- UX de sélection : clic direct sur la ligne fichier vs bouton “Sélectionner” (les deux peuvent coexister).

