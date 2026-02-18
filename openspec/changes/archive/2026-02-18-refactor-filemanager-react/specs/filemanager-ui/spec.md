## ADDED Requirements

### Requirement: React-based frontend stack

The file manager client SHALL be implemented as a React application using Axios for HTTP requests and React-Bootstrap for UI components.

#### Scenario: React application mounts on layout root

- **WHEN** the manager page loads
- **THEN** a React application SHALL be mounted on the layout root element
- **AND** configuration (api-base, initial-path, filters, picker mode, channel) SHALL be read from data-attributes and passed as props

#### Scenario: API calls use Axios

- **WHEN** the UI needs to fetch or modify data (list, upload, rename, delete, create-directory)
- **THEN** the client SHALL use Axios for HTTP requests
- **AND** errors SHALL be handled and surfaced to the user

#### Scenario: UI components use React-Bootstrap

- **WHEN** the UI renders header, sidebar, main list, modals, forms, and buttons
- **THEN** React-Bootstrap components SHALL be used where applicable
- **AND** the layout and interaction patterns SHALL remain consistent with the existing specifications (header, sidebar, main area, filters, sort)
