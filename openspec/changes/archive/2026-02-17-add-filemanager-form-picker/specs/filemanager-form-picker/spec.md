## ADDED Requirements

### Requirement: Symfony FormType with grouped text field and browse button

The bundle SHALL provide a Symfony FormType that renders a text input and a button grouped together, allowing the user to pick a file path/key via the file manager UI.

#### Scenario: Form field renders as input + button

- **WHEN** a developer uses the Filemanager picker FormType in a Symfony form
- **THEN** the rendered widget SHALL include:
  - a text input storing the selected path/key
  - a button that opens the picker modal

### Requirement: Clicking the button opens a modal with an iframe picker

Clicking the browse button SHALL open a modal dialog containing an iframe pointing to the file manager route in picker mode.

#### Scenario: Modal opens with picker iframe

- **WHEN** the user clicks the browse button
- **THEN** a modal overlay SHALL open
- **AND** the modal SHALL contain an iframe with a `src` URL that includes `picker=1`
- **AND** the `src` URL SHALL include a unique `channel` parameter for this widget instance

### Requirement: Selecting a file fills the target field and closes the modal

The widget SHALL listen for a picker `postMessage` event and, when it matches the widget channel, fill the target input with the received path/key and close the modal.

#### Scenario: Picker message updates the input value

- **WHEN** the parent window receives a `message` event where:
  - `event.origin` equals the current origin
  - `event.data.type` equals `keyboardman.filemanager.picked`
  - `event.data.channel` matches the widget channel
- **THEN** the widget SHALL set the text input value to `event.data.path`
- **AND** the modal SHALL close

### Requirement: Multiple picker fields can coexist on the same page

The system SHALL support multiple picker form fields on the same page without cross-filling values.

#### Scenario: Two picker fields do not conflict

- **WHEN** a page contains two or more picker widgets
- **THEN** each widget SHALL use a distinct channel identifier
- **AND** a selection message for one widget SHALL NOT update any other widget

