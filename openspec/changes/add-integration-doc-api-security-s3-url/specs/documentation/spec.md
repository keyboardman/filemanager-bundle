# documentation (delta)

## ADDED Requirements

### Requirement: Documentation d’intégration du bundle

The project SHALL provide documentation that describes how to integrate the filemanager bundle into a Symfony application: prerequisites (PHP, Symfony, keyboardman/filesystem-bundle), Composer installation, bundle registration, routes, assets installation, and minimal configuration (`keyboardman_filemanager`). The documentation SHALL reference existing docs (form-picker, usage, resolution d’URL) and SHALL clearly list the routes exposed by the bundle and their role (/filemanager, /filemanager/resolve-url, /api/filesystem/*).

#### Scenario: Integrator finds a single entry point for integration

- **WHEN** a developer wants to integrate the bundle into a new project
- **THEN** the documentation SHALL describe prerequisites, installation steps, and minimal configuration in one place (or with clear links)
- **AND** the documentation SHALL state which routes must be available and what they are used for

#### Scenario: Routes and configuration are documented

- **WHEN** a developer reads the integration documentation
- **THEN** the roles of GET /filemanager, GET /filemanager/resolve-url, and the filesystem API routes (/api/filesystem/*) SHALL be explained
- **AND** the configuration options `url_route` and `available_filesystems` SHALL be documented (or linked)

### Requirement: Documentation de la sécurisation de l’API (token ou auth utilisateur)

The project SHALL document how to secure the filemanager and filesystem API routes using either (1) a token (e.g. header or query parameter) or (2) Symfony user authentication (firewall, access_control). The documentation SHALL describe that the bundle does not implement these mechanisms; the application is responsible for enforcing them. The documentation SHALL include example configuration or pointers (e.g. security.yaml for user auth, and how to pass a token to the picker iframe).

#### Scenario: Token-based protection is documented

- **WHEN** an integrator wants to protect the filemanager and API with a token
- **THEN** the documentation SHALL explain that the application must validate the token (e.g. via a listener or custom firewall)
- **AND** the documentation SHALL describe how to pass the token to the front (e.g. iframe URL query parameter for the picker) so that requests are accepted

#### Scenario: User authentication protection is documented

- **WHEN** an integrator wants to restrict access to authenticated users only
- **THEN** the documentation SHALL provide or reference an example of Symfony security configuration (firewall, access_control) that restricts /filemanager and /api/filesystem/* to logged-in users
- **AND** the documentation SHALL state that /filemanager/resolve-url SHALL also be protected consistently

### Requirement: Documentation URL S3 publique sans expiration

The project SHALL document how an application can expose a public S3 URL (without expiration) for files stored on S3, when using the filemanager picker or the URL resolver. The documentation SHALL state that the bundle does not generate S3 URLs; the application configures the resolution strategy (e.g. url_route to a controller that returns the public S3 URL, or a custom resolver using the S3 SDK). The documentation SHALL describe the use case (bucket public or bucket policy for permanent public read) and point to application-side implementation.

#### Scenario: S3 public URL use case is described

- **WHEN** an integrator stores files on S3 and wants to serve them via a public URL without expiration
- **THEN** the documentation SHALL explain that the application can configure URL resolution (url_route or custom resolver) to return such an URL instead of streaming the file through the app
- **AND** the documentation SHALL clarify that the bundle only invokes the configured strategy; it does not implement S3 URL generation

#### Scenario: Implementation responsibility is clear

- **WHEN** a developer reads the S3 URL documentation
- **THEN** the documentation SHALL state that generating the public S3 URL (e.g. via AWS SDK or bucket policy) is the application’s responsibility
- **AND** the documentation SHALL indicate how this fits with the existing url_route or resolver configuration (e.g. route that redirects to S3 or returns the URL in a JSON response for resolve-url)
