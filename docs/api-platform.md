# API Platform : retourner l’URL en fonction du filesystem

← [Retour à la documentation](../README.md#documentation)

Si vous exposez des ressources API Platform dont une propriété contient une valeur **`filesystem:path`** (ex. `s3:uploads/photo.jpg`), vous pouvez ajouter une propriété **URL absolue** dans la réponse JSON en utilisant le service **`FilemanagerUrlResolver`**. L’URL dépend du filesystem (même route applicative ; pour S3, votre contrôleur peut rediriger vers une URL pré-signée ou publique).

---

## Prérequis

- [API Platform](https://api-platform.com/) installé
- `url_route` configuré dans `keyboardman_filemanager` (voir [Installation](installation.md#6-configuration-du-bundle))
- Entité (ou ressource) avec une propriété qui stocke `filesystem:path` (ex. `filePath`)

---

## Principe

- **Valeur stockée** : `filesystem:path` (ex. `default:uploads/doc.pdf`, `s3:media/video.mp4`).
- **Valeur exposée dans l’API** : en plus (ou à la place) du chemin, exposer l’**URL absolue** en appelant `FilemanagerUrlResolver::resolve($value)`. Le résolveur utilise la route configurée (`url_route`) ; pour S3, votre contrôleur peut rediriger vers le vrai lien (pré-signé ou public).

---

## 1. DTO de sortie avec propriété `url`

Utilisez un **output DTO** qui contient à la fois le chemin et l’URL résolue. Dans le **State Provider** (ou le processor) qui construit ce DTO, injectez `FilemanagerUrlResolver` et appelez `resolve()`.

### Exemple : State Provider qui remplit un DTO

```php
// src/State/MediaOutputProvider.php
namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use Keyboardman\FilemanagerBundle\Service\FilemanagerUrlResolver;

final class MediaOutputProvider implements ProviderInterface
{
    public function __construct(
        private readonly ProviderInterface $decorated,
        private readonly FilemanagerUrlResolver $urlResolver,
    ) {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $output = $this->decorated->provide($operation, $uriVariables, $context);
        if ($output instanceof MediaOutput) {
            $output->fileUrl = $this->urlResolver->resolve($output->filePath ?? '');
        }
        return $output;
    }
}
```

Enregistrez ce provider pour la ressource concernée (attribut `provider` sur l’opération ou configuration globale). Le DTO `MediaOutput` doit avoir une propriété `filePath` (remplie par le provider par défaut) et une propriété `fileUrl` (que vous remplissez avec le résolveur).

### Exemple : DTO de sortie

```php
// src/Dto/MediaOutput.php
namespace App\Dto;

final class MediaOutput
{
    public string $filePath;  // ex. s3:uploads/photo.jpg
    public string $fileUrl;   // ex. https://example.com/serve/s3/uploads/photo.jpg
}
```

Sur la ressource API Platform, pointez l’output vers ce DTO et utilisez le provider ci-dessus pour remplir `fileUrl` à partir de `filePath`.

---

## 2. Normalizer personnalisé

Une autre approche est d’ajouter une clé **`fileUrl`** (ou `url`) lors de la sérialisation de l’entité, sans passer par un DTO. Injectez `FilemanagerUrlResolver` dans un **Normalizer** et ajoutez la clé calculée.

### Exemple : normalizer qui ajoute `fileUrl`

```php
// src/Serializer/MediaNormalizer.php
namespace App\Serializer;

use Keyboardman\FilemanagerBundle\Service\FilemanagerUrlResolver;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

final class MediaNormalizer implements NormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    public function __construct(
        private readonly FilemanagerUrlResolver $urlResolver,
    ) {
    }

    public function normalize(mixed $object, ?string $format = null, array $context = []): array
    {
        $data = $this->normalizer->normalize($object, $format, $context);
        if (\is_array($data) && isset($data['filePath'])) {
            $data['fileUrl'] = $this->urlResolver->resolve((string) $data['filePath']);
        }
        return $data;
    }

    public function supportsNormalization(mixed $data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof YourMediaEntity;
    }
}
```

Enregistrez ce normalizer comme service avec le tag `serializer.normalizer`. La réponse JSON de la ressource contiendra alors `filePath` et `fileUrl`.

---

## 3. Getter sur l’entité (avec injection)

Vous pouvez exposer l’URL via un **getter** sur l’entité et l’exposer en API (ex. avec `#[ApiProperty(readable: true, writable: false)]`). L’entité doit alors recevoir le résolveur (injection par setter ou via un listener). Cette approche couple l’entité au résolveur ; les solutions DTO ou Normalizer sont souvent préférables.

### Exemple minimal (injection par constructeur)

```php
// Entité avec getter d’URL (à adapter selon votre modèle)
use Keyboardman\FilemanagerBundle\Service\FilemanagerUrlResolver;

#[ApiResource]
class Media
{
    #[ApiProperty(readable: true, writable: false)]
    private ?string $fileUrl = null;

    public function __construct(
        private readonly ?FilemanagerUrlResolver $urlResolver = null,
    ) {
    }

    public function getFilePath(): ?string { ... }

    public function getFileUrl(): string
    {
        $path = $this->getFilePath();
        return $path !== null && $this->urlResolver !== null
            ? $this->urlResolver->resolve($path)
            : '';
    }
}
```

Pour éviter d’injecter le résolveur dans l’entité, privilégiez le **DTO de sortie** ou le **Normalizer**.

---

## Résumé

| Approche | Quand l’utiliser |
|----------|------------------|
| **DTO de sortie + State Provider** | Vous utilisez déjà des output DTOs ; ajoutez une propriété `fileUrl` et remplissez-la avec `FilemanagerUrlResolver::resolve($filePath)`. |
| **Normalizer** | Vous sérialisez l’entité telle quelle ; le normalizer ajoute une clé `fileUrl` à la volée. |
| **Getter sur l’entité** | Possible si vous injectez le résolveur dans l’entité (moins recommandé). |

Dans tous les cas, **une seule source de vérité** : `FilemanagerUrlResolver::resolve()`. L’URL retournée est celle de la route `url_route` ; pour S3, c’est votre contrôleur (ex. redirection vers URL pré-signée) qui détermine le « vrai » lien.

---

## Voir aussi

- [Installation et configuration](installation.md) — `url_route`
- [URL S3 (publique ou pré-signée)](s3-public-url.md) — comportement de la route pour S3
- [Widget formulaire (picker)](form-picker.md) — `FilemanagerUrlResolver`
