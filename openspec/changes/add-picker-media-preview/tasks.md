## 1. Passage de l’URL de résolution au picker

- [x] 1.1 Modifier `picker.js` pour ajouter `resolve_url` dans l’URL de l’iframe lorsque le widget en dispose (`data-resolve-url`)

## 2. API et résolution d’URL dans le picker

- [x] 2.1 Lire le paramètre `resolve_url` dans `FileManager.jsx` (props ou query string)
- [x] 2.2 Exposer une fonction qui appelle l’endpoint de résolution avec `filesystem` et `path` et retourne l’URL absolue

## 3. Détection des types de fichiers prévisualisables

- [x] 3.1 Définir les extensions considérées comme image (jpg, jpeg, png, gif, webp, svg, etc.)
- [x] 3.2 Définir les extensions considérées comme audio (mp3, wav, ogg, m4a, flac, etc.)
- [x] 3.3 Définir les extensions considérées comme vidéo (mp4, webm, avi, mov, etc.)

## 4. Bouton et modale de prévisualisation

- [x] 4.1 Afficher le bouton « Prévisualiser » uniquement pour les fichiers image/audio/vidéo et uniquement en mode picker quand `resolve_url` est disponible
- [x] 4.2 Implémenter la modale de prévisualisation (overlay + contenu) avec fermeture (bouton, clic fond, Échap)
- [x] 4.3 Pour les images : afficher `<img src="...">` avec l’URL résolue
- [x] 4.4 Pour l’audio : afficher `<audio controls src="...">`
- [x] 4.5 Pour la vidéo : afficher `<video controls src="...">`
- [x] 4.6 Gérer le cas où la résolution d’URL échoue (message d’erreur dans la modale ou toast)

## 5. Styles et accessibilité

- [x] 5.1 Styles CSS pour la modale de prévisualisation (`.fm-preview-overlay`, `.fm-preview-content`, etc.)
- [x] 5.2 Attributs d’accessibilité (aria-label, role, focus trap si pertinent)

## 6. Validation

- [ ] 6.1 Vérifier le comportement manuellement avec fichiers image, audio et vidéo (stockage local et S3)
- [ ] 6.2 Vérifier que le bouton n’apparaît pas quand `resolve_url` est absent
