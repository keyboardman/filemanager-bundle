## Context

Le form picker stocke aujourd’hui uniquement le chemin (path) du fichier sélectionné. En présence de plusieurs filesystems (local, S3, etc.), il est nécessaire de savoir **quel** filesystem est concerné pour afficher ou servir le fichier. Par ailleurs, les applications ont besoin d’obtenir une **URL absolue** à partir de la valeur du champ (ex. pour afficher une image ou un lien de téléchargement).

## Goals / Non-Goals

- **Goals** : valeur du champ incluant le filesystem (`filesystem:path`) ou l’URL absolue selon une option du FormType ; une fonction (PHP + Twig) pour obtenir l’URL absolue à partir de `filesystem:path` ; résolution d’URL configurable par l’application.
- **Non-Goals** : implémenter la route ou le contrôleur qui sert le fichier (cela reste du ressort de l’application ou de keyboardman/filesystem-bundle) ; changer le format d’API du filesystem-bundle.

## Decisions

- **Format de valeur** : `filesystem:path`. Si `path` contient `:`, le premier `:` sépare filesystem et path (convention simple). Pour rétrocompatibilité, une valeur sans `:` peut être traitée comme `default:<value>` en lecture.
- **Résolution d’URL** : le bundle fournit un résolveur dont la stratégie est configurable (ex. `url_route: 'app_filesystem_serve'` avec paramètres `filesystem` et `path`, ou un service callable). L’application configure comment (quelle route, quel domaine) l’URL est construite. Le résolveur parse `filesystem:path` et appelle la stratégie.
- **postMessage** : le payload existant est étendu avec une propriété `filesystem` (string). Le widget parent compose alors `filesystem + ':' + path` pour la valeur de l’input (ou l’URL si `value_type=url`, voir ci-dessous).
- **Option FormType `value_type`** : `path` (défaut) ou `url`. Si `path`, la valeur stockée et affichée est `filesystem:path`. Si `url`, la valeur stockée et affichée est l’URL absolue (le widget peut appeler un endpoint du bundle pour résoudre `filesystem:path` → URL après sélection, ou un DataTransformer convertit au submit).

## Risks / Trade-offs

- **Rétrocompatibilité** : anciennes valeurs « path seul » ne contiennent pas le filesystem. Le résolveur d’URL peut traiter une chaîne sans `:` comme `default:path` pour éviter de casser l’affichage existant.
- **Sécurité** : l’URL générée pointe vers une route ou un domaine sous le contrôle de l’application ; pas de risque supplémentaire introduit par le bundle si la route est protégée côté app.

## Migration Plan

- Nouveau comportement par défaut : valeur `filesystem:path` pour les nouvelles sélections.
- Lecture : accepter les deux formats (avec ou sans préfixe `filesystem:`) et, pour l’URL, considérer l’absence de préfixe comme filesystem `default`.
- Aucune migration de données obligatoire : les champs existants peuvent rester en « path seul » jusqu’à nouvelle sélection.

## Open Questions

- Aucun pour l’instant.
