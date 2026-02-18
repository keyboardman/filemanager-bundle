# Change: Mode prévisualisation pour images, audio et vidéo dans le picker

## Why

En mode picker, l’utilisateur peut sélectionner un fichier mais ne peut pas prévisualiser son contenu avant de choisir. Pour les photos, les fichiers audio et vidéo, une prévisualisation permet de vérifier le bon fichier avant de valider la sélection.

## What Changes

- Le file manager en mode picker affiche un bouton **Prévisualiser** à côté du bouton Sélectionner pour chaque fichier image, audio ou vidéo.
- Un clic sur ce bouton ouvre une **fenêtre modale** contenant :
  - pour les images : une balise `<img>` avec l’URL du fichier
  - pour l’audio : un lecteur `<audio>` avec contrôles
  - pour la vidéo : un lecteur `<video>` avec contrôles
- L’URL du fichier est obtenue via le mécanisme de résolution existant (`filesystem:path` → URL absolue). Le picker reçoit l’URL du endpoint de résolution (par ex. via un paramètre de requête).
- La modale propose un bouton pour fermer et permet de fermer en cliquant sur le fond ou via Échap.

## Impact

- **Specs affectées** : `filemanager-picker`, éventuellement `filemanager-form-picker` (passage de l’URL de résolution au picker).
- **Code affecté** : `FileManager.jsx` (bouton prévisualisation, modale, résolution d’URL pour preview), `picker.js` (passage de `resolve_url` dans l’URL de l’iframe si besoin), `theme-modern-minimal.css` (styles de la modale preview).
