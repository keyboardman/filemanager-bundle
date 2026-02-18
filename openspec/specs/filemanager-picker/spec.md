# filemanager-picker Specification

## Purpose
TBD - created by archiving change add-filemanager-form-picker. Update Purpose after archive.
## Requirements
### Requirement: File manager “picker mode” for file selection

The file manager UI SHALL support a “picker mode” suitable for embedding in an iframe, allowing a user to select a file and return the selected path/key to the parent window.

#### Scenario: Picker mode is enabled via query parameters

- **WHEN** the user opens the file manager route with `picker=1`
- **THEN** the UI SHALL switch to picker mode (selection-enabled)
- **AND** the UI SHALL read a `channel` value (string) from the query parameters

#### Scenario: Destructive actions are disabled in picker mode

- **WHEN** the UI is in picker mode
- **THEN** actions like upload, rename, move, and delete SHALL be hidden or disabled
- **AND** the user SHALL still be able to navigate directories and list files

### Requirement: Selection sends a postMessage to the parent window

When a file is selected in picker mode, the UI SHALL send a `window.postMessage` event to the parent window containing the selected file path/key and the picker channel.

#### Scenario: Selecting a file posts a message

- **WHEN** the user selects a file entry (not a directory) in picker mode
- **THEN** the iframe SHALL call `window.parent.postMessage(...)` with:
  - **type** = `keyboardman.filemanager.picked`
  - **channel** = the `channel` provided in the query
  - **path** = the selected file path/key (string)

#### Scenario: Message is restricted to same-origin

- **WHEN** the iframe posts the message
- **THEN** the target origin SHALL be `window.location.origin`

