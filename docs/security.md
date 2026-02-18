# Sécurisation de l’API

← [Retour à la documentation](../README.md#documentation)

En production, les routes du file manager et de l’API filesystem doivent être protégées. Ce bundle **ne fournit pas** de mécanisme d’authentification : c’est à votre application de sécuriser l’accès (firewall Symfony, listener, etc.). Deux approches courantes sont décrites ci-dessous.

## Routes à protéger

- **GET /filemanager** — interface du file manager
- **GET /filemanager/resolve-url** — résolution `filesystem:path` → URL (picker, prévisualisation)
- **/api/filesystem/\*** — list, upload, rename, delete, create-directory (fourni par keyboardman/filesystem-bundle ou votre backend)

Toutes doivent être protégées de façon cohérente (même schéma d’accès).

---

## Option 1 : Sécurisation par token

L’accès est autorisé si la requête contient un token valide (par exemple en en-tête ou en paramètre de requête). Le bundle ne gère pas le token ; votre application le vérifie (listener, guard personnalisé, ou middleware).

### Côté application

1. **Valider le token** sur chaque requête vers `/filemanager`, `/filemanager/resolve-url` et `/api/filesystem/*`. Par exemple avec un [EventListener](https://symfony.com/doc/current/event_dispatcher.html) sur `kernel.request` qui vérifie un header `X-Filemanager-Token` ou un query parameter `token`, et appelle `$event->setResponse(new Response('Unauthorized', 401))` si le token est absent ou invalide.

2. **Stocker le token** de façon sécurisée (variable d’environnement, secret) et ne pas le commiter.

### Côté front (picker en iframe)

Pour que l’iframe du picker envoie le token à chaque requête, l’URL de l’iframe doit inclure le token en paramètre de requête, car l’iframe effectue un simple `GET` vers `/filemanager?picker=1&channel=...`. Par exemple :

- Générer l’URL du file manager avec `?token=...` (ou le nom de paramètre que votre listener attend).
- Le JavaScript du picker charge cette URL ; les requêtes suivantes (list, resolve-url) partent depuis la même origine. Si votre listener exige le token en query, il faudra que l’API soit appelée avec ce même paramètre (le bundle n’ajoute pas le token automatiquement ; vous pouvez étendre le front ou faire en sorte que l’API accepte le token en header et que la page parente injecte l’iframe avec une URL contenant le token, et que les appels API depuis l’iframe utilisent le même token — par exemple en le passant via `data-*` et en configurant Axios pour l’envoyer en header).

En pratique, une approche simple est d’exiger le token en **query** pour les routes protégées et de construire l’URL de l’iframe avec ce paramètre. Les appels API depuis l’iframe (même origine) peuvent alors inclure le même paramètre si votre backend le lit en query.

Exemple minimal côté app (à adapter) :

```php
// src/EventListener/FilemanagerTokenListener.php
public function onKernelRequest(RequestEvent $event): void
{
    $request = $event->getRequest();
    $path = $request->getPathInfo();
    if (!str_st_with($path, '/filemanager') && !str_st_with($path, '/api/filesystem')) {
        return;
    }
    $token = $request->headers->get('X-Filemanager-Token') ?? $request->query->get('token');
    if ($token === null || !$this->isValidToken($token)) {
        $event->setResponse(new Response('Unauthorized', 401));
    }
}
```

---

## Option 2 : Sécurisation par authentification utilisateur

Seuls les utilisateurs connectés (Symfony Security) peuvent accéder au file manager et à l’API.

### Exemple de configuration Symfony Security

Dans `config/packages/security.yaml` :

```yaml
security:
    firewalls:
        main:
            # ... votre configuration (form_login, etc.) ...

    access_control:
        # Protéger le file manager et l’API filesystem
        - { path: ^/filemanager, roles: ROLE_USER }
        - { path: ^/api/filesystem, roles: ROLE_USER }
```

- **path: ^/filemanager** couvre `/filemanager` et `/filemanager/resolve-url`.
- **path: ^/api/filesystem** couvre toutes les routes de l’API filesystem.

Adaptez les rôles (`ROLE_USER`, `ROLE_ADMIN`, etc.) à votre application. Les utilisateurs non authentifiés seront redirigés vers la page de connexion (ou recevront 401 si l’API est en JSON).

### Cohérence

Assurez-vous que **/filemanager/resolve-url** est protégé comme le reste : avec la règle `^/filemanager` ci-dessus, elle l’est déjà.

---

## Voir aussi

- [Installation et configuration](installation.md) — routes exposées, configuration du bundle
- [Widget formulaire (picker)](form-picker.md)
