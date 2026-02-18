# filemanager-ui Specification

## Purpose
TBD - created by archiving change add-filemanager-ui. Update Purpose after archive.
## Requirements
### Requirement: Header with current path, filters and sort

The file manager UI SHALL display a header containing the current directory path, type filters (image, video, audio, title), and sort options (by name ascending and descending).

#### Scenario: User sees current path in header

- **WHEN** the user opens the file manager or navigates into a directory
- **THEN** the header shows the current path (e.g. `/documents/2024`)
- **AND** the path updates when the user changes directory

#### Scenario: User filters by type

- **WHEN** the user selects a filter (image, video, audio, or title)
- **THEN** the main area list SHALL show only entries matching that filter
- **AND** folders may be included or excluded according to design (e.g. always shown when filter is on)

#### Scenario: User sorts by name

- **WHEN** the user selects sort by name ascending (or descending)
- **THEN** the main area list SHALL display directories and files ordered by name in the chosen order
- **AND** directories and files may be grouped (e.g. directories first) or mixed; behavior SHALL be consistent

### Requirement: Sidebar with directories and parent link

The file manager UI SHALL provide a left sidebar listing directories for navigation and a ".." (parent) entry when the current path is not the root.

#### Scenario: Sidebar shows directories for current path

- **WHEN** the user is viewing a directory
- **THEN** the sidebar SHALL list the subdirectories of the current path (or a relevant set of directories for navigation)
- **AND** the user SHALL be able to click a directory to navigate into it

#### Scenario: Parent directory entry

- **WHEN** the current path is not the filesystem root
- **THEN** the sidebar SHALL show a ".." (or equivalent) entry
- **AND** when the user selects "..", the UI SHALL navigate to the parent directory and refresh the list

#### Scenario: No parent at root

- **WHEN** the current path is the filesystem root
- **THEN** the ".." entry SHALL NOT be shown (or SHALL be disabled)

### Requirement: Main area lists folders and files

The file manager UI SHALL display in the main area the list of folders and files in the current directory, with clear distinction between folders and files.

#### Scenario: Main area shows current directory contents

- **WHEN** the user is viewing a directory
- **THEN** the main area SHALL list all folders and files returned by the listing API for the current path
- **AND** folders and files SHALL be visually distinct (e.g. icons or labels)

#### Scenario: List respects filters and sort

- **WHEN** the user has applied a filter and/or a sort order
- **THEN** the main area SHALL show only entries that match the filter and in the selected sort order
- **AND** the header SHALL reflect the active filter and sort (e.g. selected state)

### Requirement: Listing via filesystem API

The file manager UI SHALL obtain directory contents from the keyboardman filesystem API **GET /api/filesystem/list**, using parameters `filesystem` (default `default`), optional `type` (audio, video, image), and optional `sort` (asc, desc), so that the sidebar and main area can be populated.

#### Scenario: Client requests list with filesystem and optional type and sort

- **WHEN** the UI calls GET /api/filesystem/list with `filesystem` and optionally `type` and `sort`
- **THEN** the API returns a JSON response with `filesystem` and `paths` (array of paths)
- **AND** the UI SHALL use `paths` to display the main area and to derive directories for the sidebar (e.g. by prefix or path segments)

#### Scenario: Filter and sort passed to API

- **WHEN** the user selects a type filter (image, video, audio) or a sort order (asc, desc)
- **THEN** the UI SHALL call GET /api/filesystem/list with the corresponding `type` and/or `sort` query parameters
- **AND** the displayed list SHALL reflect the API response (and ".." SHALL be hidden or disabled at root)

### Requirement: Integration with filesystem write API

The file manager UI SHALL use the existing keyboardman filesystem API for upload, rename, move, and delete operations, and SHALL display success or error feedback.

#### Scenario: User uploads a file

- **WHEN** the user performs an upload (single or multiple) from the UI
- **THEN** the UI SHALL call the corresponding filesystem API endpoint (upload or upload-multiple)
- **AND** on success the list SHALL refresh or the new file SHALL appear; on error the user SHALL see an error message

#### Scenario: User renames or moves or deletes

- **WHEN** the user renames, moves, or deletes an entry from the UI
- **THEN** the UI SHALL call the corresponding filesystem API endpoint (rename, move, delete)
- **AND** on success the list SHALL refresh; on error the user SHALL see an error message

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

