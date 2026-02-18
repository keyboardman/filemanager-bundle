## MODIFIED Requirements

### Requirement: Symfony FormType with grouped text field and browse button

The bundle SHALL provide a Symfony FormType that renders a text input and a button grouped together, allowing the user to pick a file path/key via the file manager UI. The FormType SHALL support an option (e.g. `value_type`) so the developer can choose whether the field value is the path (`filesystem:path`) or the absolute URL.

#### Scenario: Form field renders as input + button

- **WHEN** a developer uses the Filemanager picker FormType in a Symfony form
- **THEN** the rendered widget SHALL include:
  - a text input storing the selected path/key or absolute URL (depending on option)
  - a button that opens the picker modal

#### Scenario: Developer can choose path or URL as stored value

- **WHEN** a developer configures the FormType with `value_type` set to `path` (default)
- **THEN** the field value SHALL be stored and displayed as `filesystem:path` (e.g. `s3:uploads/file.jpg`)
- **WHEN** a developer configures the FormType with `value_type` set to `url`
- **THEN** the field value SHALL be stored and displayed as the absolute URL for the selected file

### Requirement: Selecting a file fills the target field and closes the modal

The widget SHALL listen for a picker `postMessage` event and, when it matches the widget channel, fill the target input according to the field’s `value_type` (path or URL) and close the modal.

#### Scenario: Picker message updates the input value (value_type path)

- **WHEN** the parent window receives a `message` event where:
  - `event.origin` equals the current origin
  - `event.data.type` equals `keyboardman.filemanager.picked`
  - `event.data.channel` matches the widget channel
- **AND** the widget is configured for `value_type` path (default)
- **THEN** the widget SHALL set the text input value to a string in the form `filesystem:path`, using `event.data.filesystem` and `event.data.path` (e.g. `s3:uploads/file.jpg`)
- **AND** the modal SHALL close

#### Scenario: Picker message updates the input value (value_type url)

- **WHEN** the parent window receives a picker message matching the widget channel
- **AND** the widget is configured for `value_type` url
- **THEN** the widget SHALL set the text input value to the absolute URL for the selected file (e.g. by resolving `filesystem:path` via an endpoint or equivalent)
- **AND** the modal SHALL close

#### Scenario: Value indicates which filesystem the file belongs to (value_type path)

- **WHEN** the user has selected a file and the input has been filled with `value_type` path
- **THEN** the stored value SHALL include the filesystem prefix so that the application can identify the storage (e.g. `default:folder/file.jpg` or `s3:bucket-path/file.jpg`)

## ADDED Requirements

### Requirement: Resolve absolute URL from filesystem:path value

The bundle SHALL provide a way to obtain the absolute URL for a file identified by a value in the form `filesystem:path`.

#### Scenario: PHP service returns absolute URL for filesystem:path

- **WHEN** the application calls the provided resolver (e.g. a service method) with a string `filesystem:path` (e.g. `s3:uploads/photo.jpg`)
- **THEN** the resolver SHALL return the absolute URL (string) to access that file
- **AND** the resolution strategy (e.g. route name, callable) SHALL be configurable by the application

#### Scenario: Twig can resolve file URL from picker value

- **WHEN** a template has a value from a filemanager picker field (e.g. `s3:uploads/photo.jpg`)
- **THEN** the bundle SHALL expose a Twig function or filter (e.g. `filemanager_url(value)`) that returns the absolute URL for that file
- **AND** the result SHALL be suitable for use in `src`, `href`, or similar attributes
