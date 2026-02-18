# Assets (CSS, JavaScript)

← [Retour à la documentation](../README.md#documentation)

Les assets du File Manager sont séparés en **CSS**, **JavaScript** et **Twig**, et sont construits avec **Webpack Encore**.

## Structure

- **Sources** (avant build) :
  - `src/Resources/assets/styles/manager.css` — styles
  - `src/Resources/assets/js/manager.js` — logique du file manager
  - `src/Resources/assets/js/manager.entry.js` — point d’entrée Webpack (importe CSS + JS)
  - `src/Resources/views/manager.html.twig` — template (référence les assets compilés)

- **Sortie build** (après `npm run build`) :
  - `src/Resources/public/build/manager.css`
  - `src/Resources/public/build/manager.js`

La commande **`assets:install`** de Symfony copie le contenu de `Resources/public/` vers `public/bundles/keyboardmanfilemanager/` dans l’application qui utilise le bundle.

## Build (développeurs du bundle)

En local, pour recompiler les assets après modification du CSS ou du JS :

```bash
npm install
npm run build
```

En mode développement avec recompilation à chaque changement :

```bash
npm run watch
```

## Utilisation dans une application

1. Installer le bundle : `composer require keyboardman/filemanager-bundle`
2. Installer les assets : `php bin/console assets:install` (ou `--symlink` en dev)
3. Les fichiers sont servis depuis `public/bundles/keyboardmanfilemanager/build/` (manager.css, manager.js)

Le template Twig du bundle utilise `asset('bundles/keyboardmanfilemanager/build/...')` pour générer les URLs.
