# Image PHP 8.2 CLI pour tests/démo
FROM php:8.2-cli

# Installer les dépendances système et extensions PHP
RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip curl g++ libzip-dev libicu-dev libxml2-dev libonig-dev \
    make autoconf pkg-config \
    && docker-php-ext-install -j$(nproc) zip intl xml mbstring pdo \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Dossier de travail
WORKDIR /app

# Copier les scripts
COPY scripts/ /app/scripts/

# Installer les dépendances Composer
COPY composer.json composer.lock* /app/
RUN /app/scripts/composer-install.sh

# Copier le reste du code
COPY . /app/
RUN /app/scripts/composer-dump-autoload.sh

# Par défaut : lancer les tests
CMD ["./vendor/bin/phpunit"]
