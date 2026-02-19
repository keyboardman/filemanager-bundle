# URL S3 : publique ou pré-signée

← [Retour à la documentation](../README.md#documentation)

Lorsque les fichiers sont sur S3 (ou compatible, ex. MinIO), vous pouvez exposer l’accès de deux façons : **URL publique sans expiration** (bucket public) ou **redirection vers une URL pré-signée** (bucket privé, accès temporaire). Ce bundle ne génère pas les URLs S3 ; il s’appuie sur la route que vous configurez (`url_route`). C’est à votre application de décider du comportement (stream, redirection publique, ou redirection pré-signée).

---

## Détection des filesystems S3

Le bundle fournit le service **`S3FilesystemDetector`** et la configuration **`s3_filesystems`** pour indiquer quels filesystems sont S3 (ou compatibles). Votre contrôleur « servir le fichier » peut s’en servir pour appliquer une logique spécifique (ex. redirection pré-signée) sans dépendre d’un nom en dur.

**Configuration** (`config/packages/keyboardman_filemanager.yaml`) :

```yaml
keyboardman_filemanager:
    s3_filesystems: ['s3']   # ou ['s3', 'cdn'] si plusieurs buckets
```

**Utilisation en PHP** :

```php
use Keyboardman\FilemanagerBundle\Service\S3FilesystemDetector;

if ($this->s3Detector->isS3($filesystem)) {
    // Redirection vers URL pré-signée ou URL publique S3
}
```

Voir [Installation – Configuration](installation.md#6-configuration-du-bundle).

---

## Option A : URL pré-signée (bucket privé)

Le bucket reste **privé**. Votre route `url_route` (ex. `app_serve_file`) reçoit `filesystem` et `path` ; pour un filesystem déclaré dans `s3_filesystems`, le contrôleur génère une URL pré-signée (SDK AWS / S3) et renvoie une **redirection 302** vers cette URL. L’utilisateur accède au fichier sans rendre le bucket public ; l’URL expire après un délai (ex. 1 heure).

- **Avantage** : pas de politique publique sur le bucket.
- **Inconvénient** : l’URL stockée (celle de votre route) est stable, mais chaque ouverture déclenche une redirection vers une URL temporaire.

---

## Option B : URL publique sans expiration (bucket public)

Vous souhaitez des **URLs stables et sans expiration** : le bucket (ou une politique) autorise la lecture publique. Votre route `url_route` peut alors rediriger vers l’URL publique S3 (ex. `https://<bucket>.s3.<region>.amazonaws.com/<key>`) au lieu de streamer le fichier ou d’utiliser une pré-signature.

- **Avantage** : URLs stables, pas d’expiration, charge servie par S3.
- **Inconvénient** : le bucket (ou les objets) doit être lisible publiquement ; à réserver aux contenus non sensibles.

La **génération** de l’URL S3 (format, bucket, région, domaine personnalisé) est entièrement à la charge de votre application. Le bundle se contente d’appeler la stratégie configurée (`url_route`).

---

## Résumé

| Besoin | Approche |
|--------|----------|
| Bucket privé, accès temporaire | Route `url_route` → contrôleur qui redirige vers une URL pré-signée (voir démo). |
| Bucket public, URL stable | Route `url_route` → contrôleur qui redirige vers l’URL publique S3 (ou résolveur personnalisé qui retourne cette URL). |
| Détecter les filesystems S3 | Configurer `s3_filesystems` et utiliser le service `S3FilesystemDetector`. |

Le bundle **ne génère pas** l’URL S3 ; il utilise uniquement la configuration que vous fournissez. La mise en place du bucket public ou de la politique S3 relève de la documentation AWS / de votre hébergeur.

---

## Voir aussi

- [Installation et configuration](installation.md) — `url_route`, `s3_filesystems`
- [Widget formulaire (picker)](form-picker.md) — `value_type` = `url`
- [Sécurisation de l’API](security.md)
