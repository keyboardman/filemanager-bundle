# demo-infrastructure Specification

## Purpose
TBD - created by archiving change add-docker-minio-s3-demo. Update Purpose after archive.
## Requirements
### Requirement: Docker Compose with MinIO for S3-compatible storage

The project SHALL provide a Docker Compose setup that includes a MinIO service so that the file manager demo can be tested with both local storage (Flysystem Local) and S3-compatible storage (MinIO) without requiring a real AWS account.

#### Scenario: MinIO service available in Docker Compose

- **WHEN** the user runs `docker compose up` (or starts the `minio` service)
- **THEN** a MinIO container SHALL be started with persistent storage
- **AND** the MinIO API and web console SHALL be reachable on documented ports
- **AND** the demo service SHALL be able to connect to MinIO via the Docker network (e.g. hostname `minio`)

#### Scenario: Demo can use local filesystem

- **WHEN** the demo is run without S3 configuration or with default filesystem set to local
- **THEN** the file manager SHALL operate against the existing local Flysystem adapter (`var/storage`)
- **AND** behavior SHALL remain unchanged from the current demo

#### Scenario: Demo can use S3 filesystem (MinIO)

- **WHEN** MinIO is running and the demo is configured with valid S3 endpoint, credentials, and bucket (e.g. via environment variables)
- **THEN** the demo SHALL expose a filesystem (e.g. named `s3`) backed by the MinIO adapter
- **AND** the user SHALL be able to select or use this filesystem to list, upload, rename, move, and delete files via the file manager UI

#### Scenario: Docker and MinIO usage documented

- **WHEN** a developer wants to test local and S3 storage
- **THEN** `docs/docker.md` (or equivalent) SHALL describe how to start MinIO, which environment variables to set, and how to switch between local and S3 for the file manager demo

