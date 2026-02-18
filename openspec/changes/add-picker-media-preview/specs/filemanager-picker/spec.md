## ADDED Requirements

### Requirement: Preview button for media files in picker mode

In picker mode, the file manager SHALL display a "Prévisualiser" (Preview) button next to the "Sélectionner" button for each file that is an image, audio, or video. The preview button SHALL only be shown when a resolve URL endpoint is available (e.g. passed as a query parameter) so that the file URL can be fetched.

#### Scenario: Preview button visible for image files

- **WHEN** the UI is in picker mode with resolve URL configured
- **AND** a file row corresponds to an image (e.g. jpg, png, gif, webp, svg)
- **THEN** the row SHALL display both a "Sélectionner" button and a "Prévisualiser" button

#### Scenario: Preview button visible for audio and video files

- **WHEN** the UI is in picker mode with resolve URL configured
- **AND** a file row corresponds to an audio file (e.g. mp3, wav, ogg, m4a) or a video file (e.g. mp4, webm, mov)
- **THEN** the row SHALL display both a "Sélectionner" button and a "Prévisualiser" button

#### Scenario: Preview button hidden when resolve URL is not available

- **WHEN** the UI is in picker mode and no resolve URL is provided
- **THEN** the "Prévisualiser" button SHALL NOT be displayed for any file

#### Scenario: Preview button hidden for non-media files

- **WHEN** the UI is in picker mode with resolve URL configured
- **AND** a file row corresponds to a file that is not image, audio, or video (e.g. pdf, txt)
- **THEN** the row SHALL display only the "Sélectionner" button, without a "Prévisualiser" button

### Requirement: Preview modal displays media content

Clicking the "Prévisualiser" button SHALL open a modal overlay that displays the file content using the appropriate HTML element: `<img>` for images, `<audio controls>` for audio, and `<video controls>` for video. The file URL SHALL be obtained by calling the resolve endpoint with the current filesystem and file path.

#### Scenario: Image preview modal

- **WHEN** the user clicks "Prévisualiser" on an image file
- **THEN** a modal SHALL open
- **AND** the modal SHALL contain an `<img>` element with `src` set to the resolved absolute URL
- **AND** the user SHALL be able to close the modal via a close button, by clicking the overlay background, or by pressing Escape

#### Scenario: Audio preview modal

- **WHEN** the user clicks "Prévisualiser" on an audio file
- **THEN** a modal SHALL open
- **AND** the modal SHALL contain an `<audio controls>` element with `src` set to the resolved absolute URL
- **AND** the user SHALL be able to close the modal via a close button, by clicking the overlay background, or by pressing Escape

#### Scenario: Video preview modal

- **WHEN** the user clicks "Prévisualiser" on a video file
- **THEN** a modal SHALL open
- **AND** the modal SHALL contain a `<video controls>` element with `src` set to the resolved absolute URL
- **AND** the user SHALL be able to close the modal via a close button, by clicking the overlay background, or by pressing Escape

#### Scenario: Preview error when URL resolution fails

- **WHEN** the user clicks "Prévisualiser" and the resolve endpoint returns an error or an empty URL
- **THEN** the modal SHALL still open
- **AND** the modal SHALL display an error message indicating that preview is unavailable
