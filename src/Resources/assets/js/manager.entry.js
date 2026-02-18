/**
 * Point d'entrée Webpack pour le File Manager.
 * Monte l'application React sur le layout (shadcn-style, thème Modern Minimal).
 */
import '../styles/theme-modern-minimal.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import FileManager from './FileManager';

document.addEventListener('DOMContentLoaded', () => {
  const layout = document.querySelector('.layout');
  if (!layout) return;

  const apiBase = layout.getAttribute('data-api-base') || '/api/filesystem';
  const initialPath = layout.getAttribute('data-initial-path') || '';
  const initialFilterType = layout.getAttribute('data-initial-filter-type') || '';
  const initialFilterSearch = layout.getAttribute('data-initial-filter-search') || '';
  const initialSort = layout.getAttribute('data-initial-sort') || 'asc';
  const initialFilesystem = layout.getAttribute('data-initial-filesystem') || 'default';
  const pickerMode = layout.getAttribute('data-picker') === '1';
  const channel = layout.getAttribute('data-channel') || '';

  const root = createRoot(layout);
  root.render(
    <FileManager
      apiBase={apiBase}
      initialPath={initialPath}
      initialFilterType={initialFilterType}
      initialFilterSearch={initialFilterSearch}
      initialSort={initialSort}
      initialFilesystem={initialFilesystem}
      pickerMode={pickerMode}
      channel={channel}
    />
  );
});
