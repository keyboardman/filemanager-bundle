# Tests

← [Retour à la documentation](../README.md#documentation)

## Lancer les tests

À la racine du dépôt (après `composer install`) :

```bash
./vendor/bin/phpunit
```

Configuration : `phpunit.xml.dist` (bootstrap : `tests/bootstrap.php`).

## Structure des tests

- **tests/bootstrap.php** : chargement de l’autoload et optionnellement `.env`.
- **tests/Kernel.php** : noyau de test Symfony (MicroKernelTrait) chargeant FrameworkBundle, TwigBundle et le bundle, avec routes importées depuis `src/Resources/config/routes.yaml`.
- **tests/Controller/FilemanagerControllerTest.php** : test fonctionnel qui envoie une requête **GET /filemanager** et vérifie :
  - code de réponse 200 ;
  - présence dans la page de « File Manager », « Chemin », « Filtre », « Tri », « API_BASE », « filesystem ».

## Avec Docker

**Tests :**
```bash
docker build -t keyboardman/filemanager-bundle .
docker run --rm keyboardman/filemanager-bundle ./vendor/bin/phpunit
```

Ou avec docker-compose :
```bash
docker compose run --rm test
```

Voir [README](../README.md#docker) pour la démo.
