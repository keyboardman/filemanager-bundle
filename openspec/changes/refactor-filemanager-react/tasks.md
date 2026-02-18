## 1. Configuration et dépendances

- [x] 1.1 Ajouter react, react-dom, axios, react-bootstrap aux dépendances npm
- [x] 1.2 Configurer Webpack Encore pour React (enableReactPreset ou équivalent, support .jsx)
- [x] 1.3 Vérifier que le build produit manager.js et manager.css correctement

## 2. Service API (Axios)

- [x] 2.1 Créer un module API (ou hook) utilisant Axios pour les endpoints : list, upload, upload-multiple, rename, delete, create-directory
- [x] 2.2 Gérer les erreurs HTTP et retourner des messages exploitables par l'UI

## 3. Composants React principaux

- [x] 3.1 Créer le composant racine FileManager avec état (path, filters, sort, paths, pickerMode, channel)
- [x] 3.2 Implémenter Header (chemin, filtres type/recherche, tri) avec React-Bootstrap
- [x] 3.3 Implémenter Sidebar (navigation dossiers, parent) avec React-Bootstrap
- [x] 3.4 Implémenter Main (liste dossiers/fichiers, actions rename/delete/pick)
- [x] 3.5 Implémenter barre d'upload et modale nouveau dossier (cachés en mode picker)
- [x] 3.6 Implémenter affichage des messages succès/erreur

## 4. Montage et intégration Twig

- [x] 4.1 Adapter manager.html.twig : root div unique avec data-attributes (api-base, initial-path, filter, sort, picker, channel)
- [x] 4.2 Adapter manager.entry.js pour lire les data-attrs et monter le composant React
- [x] 4.3 S'assurer que le CSS Bootstrap et les styles personnalisés sont chargés

## 5. Mode picker et postMessage

- [x] 5.1 Conserver l'émission de postMessage (keyboardman.filemanager.picked) lors de la sélection en mode picker
- [ ] 5.2 Tester l'intégration avec le form picker (modal iframe)

## 6. Tests et validation

- [ ] 6.1 Tester la navigation, filtres, tri, upload, rename, delete, nouveau dossier
- [ ] 6.2 Tester le mode picker et la réception du path dans le form
- [ ] 6.3 Vérifier la compatibilité avec les navigateurs cibles
