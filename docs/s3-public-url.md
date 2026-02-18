# URL S3 publique sans expiration

← [Retour à la documentation](../README.md#documentation)

Lorsque les fichiers sont stockés sur S3 (ou un stockage compatible S3 comme MinIO), vous pouvez souhaiter exposer une **URL publique sans expiration** plutôt que de faire transiter le fichier par votre application (stream via une route Symfony). Typiquement : bucket configuré en lecture publique, ou politique de bucket qui autorise l’accès en lecture sans limite de temps.

Ce bundle **ne génère pas** d’URL S3. Il s’appuie sur la stratégie de résolution d’URL que vous configurez (`url_route` ou service de résolution). C’est à votre application de fournir l’URL publique S3.

---

## Cas d’usage

- Fichiers (images, vidéos, etc.) dans un bucket S3 déjà public ou avec une politique d’accès public en lecture.
- Souhaiter des URLs stables et sans expiration pour l’affichage ou le partage (pas de pré-signature avec date d’expiration).
- Réduire la charge sur votre serveur en laissant le navigateur charger les fichiers directement depuis S3.

---

## Comment fournir l’URL publique S3

Le bundle utilise soit la route nommée `url_route` (voir [Installation – Configuration](installation.md#5-configuration-du-bundle)), soit un résolveur injecté, pour transformer une valeur `filesystem:path` (ex. `s3:uploads/photo.jpg`) en URL absolue. Cette URL est utilisée par le form picker (`value_type` = `url`), la fonction Twig `filemanager_url()`, et la route `/filemanager/resolve-url`.

Pour exposer une **URL S3 publique** :

1. **Configurer une route applicative** (`url_route`) qui, au lieu de streamer le fichier, renvoie une **redirection** (302) vers l’URL publique S3, ou un contrôleur qui génère cette URL et la renvoie (pour resolve-url, l’appel est en GET avec `filesystem` et `path` ; le résolveur du bundle appelle `UrlGenerator::generate(url_route, ['filesystem' => ..., 'path' => ...])`, donc votre route doit pouvoir produire l’URL finale).
2. **Dans le contrôleur de cette route** : à partir de `filesystem` et `path`, calculez l’URL publique S3 (par exemple avec le SDK AWS : région, bucket, clé). Pour un bucket public, l’URL est souvent de la forme `https://<bucket>.s3.<region>.amazonaws.com/<path>` ou via un domaine personnalisé. Vous pouvez aussi déléguer à un service qui connaît la configuration S3 (bucket, région) et construit l’URL.
3. **Comportement** :
   - Si votre `url_route` pointe vers un contrôleur qui fait un `RedirectResponse` vers l’URL S3, alors `filemanager_url()` et le picker en `value_type` = `url` obtiendront cette URL (le générateur d’URL Symfony produit l’URL de la route ; si le front ou le picker suit la redirection, l’utilisateur récupère le fichier depuis S3).
   - Si vous préférez que le résolveur retourne **directement** l’URL S3 (sans passer par une redirection), le bundle ne supporte pas nativement un callable de résolution ; en revanche, vous pouvez **remplacer ou décorer** le service `Keyboardman\FilemanagerBundle\Service\FilemanagerUrlResolver` dans votre application pour qu’il retourne l’URL S3 pour le filesystem `s3` et garde le comportement actuel (url_route) pour les autres filesystems.

En résumé : la **génération** de l’URL S3 (format, bucket, région) est entièrement à la charge de votre application. Le bundle se contente d’appeler la stratégie configurée (`url_route` ou le résolveur que vous fournissez).

---

## Exemple (idée générale)

- **Bucket public** : vous avez un bucket S3 avec une politique permettant la lecture publique. Vous créez une route `app_serve_file` (paramètres `filesystem`, `path`) dont le contrôleur :
  - si `filesystem === 's3'` : construit l’URL S3 publique (ex. `https://mon-bucket.s3.eu-west-1.amazonaws.com/` + path) et renvoie un `RedirectResponse` vers cette URL (ou vous implémentez un résolveur personnalisé qui retourne cette URL pour que le picker et Twig reçoivent directement l’URL S3).
  - sinon : sert le fichier depuis le filesystem local comme d’habitude (stream).
- Ainsi, pour les valeurs `s3:...`, l’utilisateur obtient une URL S3 publique sans expiration, sans que le bundle n’ait à connaître AWS.

---

## Rappel

- Le bundle **ne génère pas** l’URL S3 ; il utilise uniquement la configuration que vous fournissez (`url_route` ou résolveur personnalisé).
- La mise en place du bucket public ou de la politique S3, et le format exact de l’URL, relèvent de la documentation AWS / de votre hébergeur S3.

---

## Voir aussi

- [Installation et configuration](installation.md) — `url_route`, `available_filesystems`
- [Widget formulaire (picker)](form-picker.md) — `value_type` = `url`, `resolve_url_route`
- [Sécurisation de l’API](security.md)
