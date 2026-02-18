.PHONY: help install-demo demo watch test build down clean

# Variables
DEMO_DIR := demo
DEMO_PORT ?= 8000

# Aide par défaut
help: ## Affiche cette aide
	@echo "Commandes disponibles:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Pour tester le bundle avec la démo :"
	@echo "  1. make install-demo   (une fois)"
	@echo "  2. make demo           (démarre le serveur sur http://127.0.0.1:$(DEMO_PORT))"
	@echo "  3. Dans un autre terminal : make watch   (les modifs JS sont visibles après rafraîchissement)"

# Installation de la démo (sans Docker)
install-demo: ## Installe les deps + build assets + symlink pour la démo
	@echo "📦 Installation des dépendances de la démo..."
	cd $(DEMO_DIR) && composer update
	@echo "📦 Installation des dépendances npm du bundle..."
	npm ci
	@echo "🔨 Build des assets (JS/CSS)..."
	npm run build
	@echo "🔗 Création du symlink des assets vers la démo..."
	./scripts/demo-assets-symlink.sh
	@echo "✅ Démo prête. Lancez \033[1mmake demo\033[0m puis ouvrez http://127.0.0.1:$(DEMO_PORT)/filemanager"

# Démarrer la démo avec le serveur Symfony (symfony serve)
demo: ## Démarre la démo avec symfony serve sur http://127.0.0.1:$(DEMO_PORT)
	@if [ ! -d "$(DEMO_DIR)/vendor" ]; then echo "❌ Exécutez d'abord: make install-demo"; exit 1; fi
	@if [ ! -L "$(DEMO_DIR)/public/bundles/keyboardmanfilemanager" ] && [ ! -d "$(DEMO_DIR)/public/bundles/keyboardmanfilemanager" ]; then \
		echo "⚠️  Assets non liés. Exécution de ./scripts/demo-assets-symlink.sh"; \
		./scripts/demo-assets-symlink.sh; \
	fi
	@echo "🚀 Démo sur http://127.0.0.1:$(DEMO_PORT)/filemanager"
	@echo "   Pour voir les modifs JS en direct : lancez \033[1mmake watch\033[0m dans un autre terminal."
	cd $(DEMO_DIR) && symfony serve --port=$(DEMO_PORT)

# Watch des assets : les changements JS sont servis par la démo (symlink)
watch: ## Rebuild automatique des assets à chaque modification
	npm run watch

# Build des assets (production)
build: ## Build des assets (JS/CSS) du bundle
	npm run build

# Tests PHPUnit (sans Docker)
test: ## Lance les tests PHPUnit
	./vendor/bin/phpunit

# Nettoyage
down: ## N'utilisé qu'avec Docker (voir demo-docker)
	@echo "Pour la démo locale, arrêtez le serveur avec Ctrl+C."

clean: ## Supprime le cache et les artefacts de la démo
	rm -rf $(DEMO_DIR)/var/cache/*
	@echo "Cache démo supprimé."

# --- Docker : MinIO uniquement (pour tester S3 en local) ---
COMPOSE := docker compose

minio: ## [Docker] Démarre MinIO (API S3 + console sur 9000 / 9001)
	$(COMPOSE) up minio

minio-down: ## [Docker] Arrête MinIO
	$(COMPOSE) down
