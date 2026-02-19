# Sécurisation de l’API

← [Retour à la documentation](../README.md#documentation)

En production, les routes du file manager et de l’API filesystem doivent être protégées. Ce bundle **ne fournit pas** d’authentification : c’est à votre application de la mettre en place (firewall Symfony, listener, etc.). Deux approches courantes sont décrites ci-dessous.

## Routes à protéger

| Route | Rôle |
|-------|------|
| **GET /filemanager** | Interface du file manager |
| **GET /filemanager/resolve-url** | Résolution `filesystem:path` → URL (picker, prévisualisation) |
| **/api/filesystem/\*** | API filesystem (list, upload, rename, delete, create-directory) |

Toutes doivent être protégées de façon cohérente (même mécanisme d’accès).

---

## Option 1 : Token

L’accès est autorisé si la requête contient un token valide (en-tête ou paramètre de requête). Le bundle ne gère pas le token ; votre application le vérifie (listener, guard, etc.).

### Côté application

1. **Valider le token** sur chaque requête vers `/filemanager`, `/filemanager/resolve-url` et `/api/filesystem/*`. Exemple : un [EventListener](https://symfony.com/doc/current/event_dispatcher.html) sur `kernel.request` qui vérifie un header `X-Filemanager-Token` ou un paramètre `token`, et renvoie `401 Unauthorized` si le token est absent ou invalide.

2. **Stocker le token** de façon sécurisée (variable d’environnement, secret) et ne pas le commiter.

### Côté front (picker en iframe)

L’iframe du picker charge `/filemanager?picker=1&channel=...`. Pour que les requêtes soient autorisées, inclure le token dans l’URL de l’iframe (ex. `?token=...`) si votre backend l’exige en query. Les appels API depuis l’iframe (même origine) devront alors envoyer le même paramètre ; le bundle n’ajoute pas le token automatiquement (vous pouvez l’injecter via `data-*` et configurer le client HTTP côté front si besoin).

### Exemple de listener (à adapter)

```php
// src/EventListener/FilemanagerTokenListener.php
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpFoundation\Response;

public function onKernelRequest(RequestEvent $event): void
{
    $request = $event->getRequest();
    $path = $request->getPathInfo();
    if (!str_starts_with($path, '/filemanager') && !str_starts_with($path, '/api/filesystem')) {
        return;
    }
    $token = $request->headers->get('X-Filemanager-Token') ?? $request->query->get('token');
    if ($token === null || !$this->isValidToken($token)) {
        $event->setResponse(new Response('Unauthorized', 401));
    }
}
```

---

## Option 2 : Authentification utilisateur (Symfony Security)

Seuls les utilisateurs connectés peuvent accéder au file manager et à l’API.

### Exemple de configuration

Dans `config/packages/security.yaml` :

```yaml
security:
    firewalls:
        main:
            # ... form_login, etc. ...

    access_control:
        - { path: ^/filemanager, roles: ROLE_USER }
        - { path: ^/api/filesystem, roles: ROLE_USER }
```

- `^/filemanager` couvre `/filemanager` et `/filemanager/resolve-url`.
- `^/api/filesystem` couvre toutes les routes de l’API filesystem.

Adaptez les rôles à votre application. Les utilisateurs non authentifiés sont redirigés vers la page de connexion (ou reçoivent 401 pour l’API JSON).

---

## Voir aussi

- [Installation et configuration](installation.md)
- [Widget formulaire (picker)](form-picker.md)
