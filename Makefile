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
	cd $(DEMO_DIR) && composer install
	@echo "📦 Installation des dépendances npm du bundle..."
	npm ci
	@echo "🔨 Build des assets (JS/CSS)..."
	npm run build
	@echo "🔗 Création du symlink des assets vers la démo..."
	./scripts/demo-assets-symlink.sh
	@echo "✅ Démo prête. Lancez \033[1mmake demo\033[0m puis ouvrez http://127.0.0.1:$(DEMO_PORT)/filemanager"

# Démarrer la démo avec le serveur PHP intégré
demo: ## Démarre la démo sur http://127.0.0.1:$(DEMO_PORT) (sans Docker)
	@if [ ! -d "$(DEMO_DIR)/vendor" ]; then echo "❌ Exécutez d'abord: make install-demo"; exit 1; fi
	@if [ ! -L "$(DEMO_DIR)/public/bundles/keyboardmanfilemanager" ] && [ ! -d "$(DEMO_DIR)/public/bundles/keyboardmanfilemanager" ]; then \
		echo "⚠️  Assets non liés. Exécution de ./scripts/demo-assets-symlink.sh"; \
		./scripts/demo-assets-symlink.sh; \
	fi
	@echo "🚀 Démo sur http://127.0.0.1:$(DEMO_PORT)/filemanager"
	@echo "   Pour voir les modifs JS en direct : lancez \033[1mmake watch\033[0m dans un autre terminal."
	cd $(DEMO_DIR) && php -S 127.0.0.1:$(DEMO_PORT) -t public

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

# --- Docker (optionnel, pour CI ou sans PHP/Composer local) ---
COMPOSE := docker compose
SERVICE_TEST := test
SERVICE_DEMO := demo

demo-docker: ## [Docker] Démarre la démo dans un conteneur (port 8000)
	$(COMPOSE) build $(SERVICE_DEMO)
	@echo "🚀 Démo Docker sur http://localhost:8000/filemanager"
	$(COMPOSE) up $(SERVICE_DEMO)

test-docker: ## [Docker] Lance les tests PHPUnit dans un conteneur
	$(COMPOSE) build $(SERVICE_TEST)
	$(COMPOSE) run --rm $(SERVICE_TEST)

docker-down: ## [Docker] Arrête les conteneurs
	$(COMPOSE) down
