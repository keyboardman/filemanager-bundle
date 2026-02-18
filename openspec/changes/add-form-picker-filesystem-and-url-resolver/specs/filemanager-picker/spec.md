## MODIFIED Requirements

### Requirement: Selection sends a postMessage to the parent window

When a file is selected in picker mode, the UI SHALL send a `window.postMessage` event to the parent window containing the selected file path/key, the current filesystem name, and the picker channel.

#### Scenario: Selecting a file posts a message

- **WHEN** the user selects a file entry (not a directory) in picker mode
- **THEN** the iframe SHALL call `window.parent.postMessage(...)` with:
  - **type** = `keyboardman.filemanager.picked`
  - **channel** = the `channel` provided in the query
  - **path** = the selected file path/key (string)
  - **filesystem** = the current filesystem name (string, e.g. `default`, `s3`)

#### Scenario: Message is restricted to same-origin

- **WHEN** the iframe posts the message
- **THEN** the target origin SHALL be `window.location.origin`
