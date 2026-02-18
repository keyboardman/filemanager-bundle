## MODIFIED Requirements

### Requirement: Clicking the button opens a modal with an iframe picker

Clicking the browse button SHALL open a modal dialog containing an iframe pointing to the file manager route in picker mode.

#### Scenario: Modal opens with picker iframe

- **WHEN** the user clicks the browse button
- **THEN** a modal overlay SHALL open
- **AND** the modal SHALL contain an iframe with a `src` URL that includes `picker=1`
- **AND** the `src` URL SHALL include a unique `channel` parameter for this widget instance

#### Scenario: Iframe URL includes resolve URL when configured

- **WHEN** the widget has a resolve URL configured (e.g. `data-resolve-url` attribute)
- **AND** the user clicks the browse button
- **THEN** the iframe `src` URL SHALL include the resolve URL as a query parameter (e.g. `resolve_url=...`)
- **AND** the picker inside the iframe SHALL use this parameter to resolve file URLs for preview
