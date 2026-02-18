/**
 * File Manager – composant React, style shadcn/ui, thème Modern Minimal (tweakcn).
 */
import React, { useState, useEffect, useCallback } from 'react';
import { createFilesystemApi } from './api';

const MINIMAL_PNG = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
  0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
  0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
  0x42, 0x60, 0x82,
]);

function directChildren(paths, prefix, sort = 'asc') {
  const dirs = new Set();
  const files = [];
  const p = prefix ? prefix + '/' : '';
  paths.forEach((path) => {
    if (!path.startsWith(p) || path === p) return;
    const rest = path.slice(p.length);
    if (!rest) return;
    const idx = rest.indexOf('/');
    if (idx === -1) files.push(rest);
    else dirs.add(rest.slice(0, idx));
  });
  const sortedDirs = Array.from(dirs).sort();
  const sortedFiles = files.sort();
  if (sort === 'desc') {
    sortedDirs.reverse();
    sortedFiles.reverse();
  }
  return { dirs: sortedDirs, files: sortedFiles };
}

function getParentPath(path) {
  if (!path) return '';
  const i = path.lastIndexOf('/');
  return i === -1 ? '' : path.slice(0, i);
}

const EXT_TO_ICON = {
  jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️', webp: '🖼️', svg: '🖼️', ico: '🖼️', bmp: '🖼️',
  mp4: '🎬', webm: '🎬', avi: '🎬', mov: '🎬', mkv: '🎬', m4v: '🎬', ogv: '🎬', wmv: '🎬',
  mp3: '🎵', wav: '🎵', ogg: '🎵', m4a: '🎵', flac: '🎵', aac: '🎵', wma: '🎵',
  pdf: '📕', doc: '📘', docx: '📘', xls: '📗', xlsx: '📗', ppt: '📙', pptx: '📙',
  txt: '📄', md: '📄', csv: '📊',
  zip: '📦', tar: '📦', gz: '📦', rar: '📦', '7z': '📦',
  js: '💻', jsx: '💻', ts: '💻', tsx: '💻', json: '💻', php: '💻', py: '💻', html: '💻', css: '💻', scss: '💻',
};

function getFileIcon(filename) {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext && EXT_TO_ICON[ext] ? EXT_TO_ICON[ext] : '📄';
}

export default function FileManager(props) {
  const {
    apiBase = '/api/filesystem',
    initialPath = '',
    initialFilterType = '',
    initialFilterSearch = '',
    initialSort = 'asc',
    initialFilesystem = 'default',
    pickerMode = false,
    channel = '',
  } = props;

  const [currentPath, setCurrentPath] = useState(initialPath);
  const [filterType, setFilterType] = useState(initialFilterType);
  const [filterSearch, setFilterSearch] = useState(initialFilterSearch);
  const [sort, setSort] = useState(initialSort);
  const [filesystem, setFilesystem] = useState(initialFilesystem);
  const [allPaths, setAllPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ text: null, type: null });
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [renameTarget, setRenameTarget] = useState(null);
  const [renameNewName, setRenameNewName] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const fileInputRef = React.useRef(null);

  const api = React.useMemo(() => createFilesystemApi(apiBase, filesystem), [apiBase, filesystem]);

  const showMessage = useCallback((text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: null, type: null }), 4000);
  }, []);

  const buildUrlWithParams = useCallback(
    (path) => {
      const params = new URLSearchParams();
      if (path) params.set('path', path);
      if (filterType) params.set('filter[type]', filterType);
      if (filterSearch) params.set('filter[search]', filterSearch);
      const sortVal = sort === 'asc' ? 'name_asc' : 'name_desc';
      params.set('sort', sortVal);
      if (filesystem && filesystem !== 'default') params.set('filesystem', filesystem);
      if (pickerMode && channel) {
        params.set('picker', '1');
        params.set('channel', channel);
      }
      return window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    },
    [filterType, filterSearch, sort, filesystem, pickerMode, channel]
  );

  const fetchList = useCallback(() => {
    setLoading(true);
    setError(null);
    return api
      .list({
        path: currentPath,
        type: filterType || undefined,
        filterSearch: filterSearch || undefined,
        sort,
      })
      .then((data) => {
        setAllPaths(data.paths || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api, currentPath, filterType, filterSearch, sort]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  useEffect(() => {
    const url = buildUrlWithParams(currentPath);
    window.history.replaceState({}, '', url);
  }, [currentPath, buildUrlWithParams]);

  const refresh = useCallback(() => {
    showMessage('Opération réussie', 'success');
    return fetchList();
  }, [fetchList, showMessage]);

  const sendPickerSelection = useCallback(
    (path) => {
      if (!pickerMode || !channel || typeof window.parent.postMessage !== 'function') return;
      window.parent.postMessage(
        { type: 'keyboardman.filemanager.picked', channel, path },
        window.location.origin
      );
    },
    [pickerMode, channel]
  );

  const handleNavigate = (path) => setCurrentPath(path);
  const handleFilterChange = (e) => setFilterType(e.target.value);
  const handleFilterSearchChange = (e) => setFilterSearch(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);
  const handleFilesystemChange = (e) => {
    const newFilesystem = e.target.value;
    setFilesystem(newFilesystem);
    setCurrentPath(''); // Reset au root lors du changement de filesystem
    // La liste sera rechargée automatiquement via useEffect car api change
  };

  const handleRowClick = (isDir, fullPath) => {
    if (isDir) handleNavigate(fullPath);
    else if (pickerMode) sendPickerSelection(fullPath);
  };

  const handlePick = (e, path) => {
    e.stopPropagation();
    sendPickerSelection(path);
  };

  const handleRename = (e, path) => {
    e.stopPropagation();
    setRenameTarget(path);
    setRenameNewName(path.split('/').pop());
  };

  const handleRenameSubmit = async () => {
    if (!renameTarget) return;
    const trimmed = renameNewName.trim();
    if (!trimmed) {
      showMessage('Le nom ne peut pas être vide', 'error');
      return;
    }
    if (trimmed.includes('/')) {
      showMessage('Le nom ne doit pas contenir /', 'error');
      return;
    }
    const targetPath = renameTarget.replace(/[^/]+$/, '') + trimmed;
    if (targetPath === renameTarget) {
      setRenameTarget(null);
      return;
    }
    setRenameTarget(null);
    try {
      await api.rename(renameTarget, targetPath);
      refresh();
    } catch (err) {
      showMessage(err.message, 'error');
    }
  };

  const handleDelete = (e, path) => {
    e.stopPropagation();
    setDeleteTarget(path);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const pathToDelete = deleteTarget;
    setDeleteTarget(null);
    try {
      await api.delete(pathToDelete);
      refresh();
    } catch (err) {
      showMessage(err.message, 'error');
    }
  };

  const handleUpload = () => {
    const input = fileInputRef.current;
    if (!input?.files?.length) {
      showMessage('Choisir un ou plusieurs fichiers', 'error');
      return;
    }
    const files = Array.from(input.files);
    const keyPrefix = currentPath ? currentPath + '/' : '';
    const uploadPromise =
      files.length === 1
        ? api.upload(keyPrefix + files[0].name, files[0])
        : api.uploadMultiple(keyPrefix, files);
    uploadPromise
      .then(() => {
        input.value = '';
        refresh();
      })
      .catch((err) => showMessage(err.message, 'error'));
  };

  const handleNewFolder = () => {
    setNewFolderName('');
    setShowNewFolder(true);
  };

  const handleNewFolderSubmit = async () => {
    const trimmed = newFolderName.trim();
    if (!trimmed) {
      showMessage('Le nom du dossier ne peut pas être vide', 'error');
      return;
    }
    if (trimmed.includes('/')) {
      showMessage('Le nom du dossier ne doit pas contenir /', 'error');
      return;
    }
    const newPath = currentPath ? currentPath + '/' + trimmed : trimmed;
    setShowNewFolder(false);
    try {
      await api.createDirectory(newPath);
      refresh();
    } catch (err) {
      if (err.message.includes('404') || err.message.includes('Route')) {
        const key = newPath + '/keep.png';
        const blob = new Blob([MINIMAL_PNG], { type: 'image/png' });
        api
          .uploadPlaceholderFile(key, blob)
          .then(refresh)
          .catch((e) => showMessage(e.message, 'error'));
      } else {
        showMessage(err.message, 'error');
      }
    }
  };

  const { dirs, files } = directChildren(allPaths, currentPath, sort);
  const parentPath = getParentPath(currentPath);
  const pathSegments = currentPath ? currentPath.split('/').filter(Boolean) : [];

  return (
    <div className="fm-root fm-layout">
      <header className="fm-header">
        <div className="fm-breadcrumb">
          <button
            type="button"
            className="fm-btn fm-btn-ghost fm-btn-sm"
            onClick={() => handleNavigate('')}
          >
            Racine
          </button>
          {pathSegments.map((seg, i) => {
            const pathUpToHere = pathSegments.slice(0, i + 1).join('/');
            return (
              <React.Fragment key={pathUpToHere}>
                <span aria-hidden>/</span>
                <button
                  type="button"
                  className="fm-btn fm-btn-ghost fm-btn-sm"
                  onClick={() => handleNavigate(pathUpToHere)}
                >
                  {seg}
                </button>
              </React.Fragment>
            );
          })}
          {pathSegments.length === 0 && <span>/</span>}
        </div>
        <div className="fm-toolbar">
          <label className="fm-dialog-label" style={{ marginBottom: 0, marginRight: '0.25rem' }}>
            Stockage
          </label>
          <select
            className="fm-select"
            value={filesystem}
            onChange={handleFilesystemChange}
            style={{ width: 'auto' }}
          >
            <option value="default">Local</option>
            <option value="s3">S3 / MinIO</option>
          </select>
          <label className="fm-dialog-label" style={{ marginBottom: 0, marginRight: '0.25rem', marginLeft: '0.75rem' }}>
            Filtre
          </label>
          <select
            className="fm-select"
            value={filterType}
            onChange={handleFilterChange}
            style={{ width: 'auto' }}
          >
            <option value="">Tous</option>
            <option value="image">Image</option>
            <option value="video">Vidéo</option>
            <option value="audio">Audio</option>
          </select>
          <input
            type="text"
            className="fm-input"
            placeholder="Rechercher..."
            value={filterSearch}
            onChange={handleFilterSearchChange}
            style={{ width: 140 }}
          />
          <select
            className="fm-select"
            value={sort}
            onChange={handleSortChange}
            style={{ width: 'auto' }}
          >
            <option value="asc">A→Z</option>
            <option value="desc">Z→A</option>
          </select>
        </div>
      </header>

      {message.text && (
        <div className={`fm-alert ${message.type === 'error' ? 'fm-alert-error' : 'fm-alert-success'}`}>
          {message.text}
        </div>
      )}

      {!pickerMode && (
        <div className="fm-upload-bar">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            className="fm-input"
          />
          <button type="button" className="fm-btn fm-btn-default fm-btn-sm" onClick={handleUpload}>
            Téléverser
          </button>
          <button type="button" className="fm-btn fm-btn-default fm-btn-sm" onClick={handleNewFolder}>
            Nouveau dossier
          </button>
        </div>
      )}

      <div className="fm-body">
        <aside className="fm-sidebar">
          {loading && !allPaths.length ? (
            <div className="fm-loading">Chargement…</div>
          ) : error ? (
            <div className="fm-empty">Erreur</div>
          ) : (
            <>
              {currentPath && (
                <button
                  type="button"
                  className="fm-sidebar-item parent"
                  onClick={() => handleNavigate(parentPath)}
                  title="Remonter au dossier parent"
                >
                  <span className="fm-sidebar-icon" aria-hidden>↑</span>
                  Dossier parent
                </button>
              )}
              {dirs.map((d) => {
                const nextPath = currentPath ? currentPath + '/' + d : d;
                return (
                  <button
                    key={nextPath}
                    type="button"
                    className="fm-sidebar-item"
                    onClick={() => handleNavigate(nextPath)}
                  >
                    📁 {d}
                  </button>
                );
              })}
              {!currentPath && dirs.length === 0 && <div className="fm-empty">(vide)</div>}
            </>
          )}
        </aside>

        <main className="fm-main">
          <h2 className="fm-main-title">Fichiers et dossiers</h2>
          <div className="fm-list">
            {loading && !allPaths.length ? (
              <div className="fm-loading">Chargement…</div>
            ) : error ? (
              <div className="fm-alert fm-alert-error">{error}</div>
            ) : (
              <>
                {dirs.map((name) => {
                  const fullPath = currentPath ? currentPath + '/' + name : name;
                  return (
                    <div
                      key={fullPath}
                      className="fm-row"
                      data-dir="1"
                      data-path={fullPath}
                      onClick={() => handleRowClick(true, fullPath)}
                    >
                      <span className="fm-icon" title="Dossier">📁</span>
                      <span className="fm-name">{name}</span>
                      {!pickerMode && (
                        <span className="fm-actions">
                          <button
                            type="button"
                            className="fm-btn fm-btn-ghost fm-btn-sm"
                            onClick={(e) => handleRename(e, fullPath)}
                          >
                            Renommer
                          </button>
                          <button
                            type="button"
                            className="fm-btn fm-btn-destructive fm-btn-sm"
                            onClick={(e) => handleDelete(e, fullPath)}
                          >
                            Supprimer
                          </button>
                        </span>
                      )}
                    </div>
                  );
                })}
                {files.map((name) => {
                  const fullPath = currentPath ? currentPath + '/' + name : name;
                  return (
                    <div
                      key={fullPath}
                      className="fm-row"
                      data-dir="0"
                      data-path={fullPath}
                      onClick={() => handleRowClick(false, fullPath)}
                    >
                      <span className="fm-icon" title={name}>{getFileIcon(name)}</span>
                      <span className="fm-name">{name}</span>
                      {pickerMode ? (
                        <span className="fm-actions">
                          <button
                            type="button"
                            className="fm-btn fm-btn-primary fm-btn-sm"
                            onClick={(e) => handlePick(e, fullPath)}
                          >
                            Sélectionner
                          </button>
                        </span>
                      ) : (
                        <span className="fm-actions">
                          <button
                            type="button"
                            className="fm-btn fm-btn-ghost fm-btn-sm"
                            onClick={(e) => handleRename(e, fullPath)}
                          >
                            Renommer
                          </button>
                          <button
                            type="button"
                            className="fm-btn fm-btn-destructive fm-btn-sm"
                            onClick={(e) => handleDelete(e, fullPath)}
                          >
                            Supprimer
                          </button>
                        </span>
                      )}
                    </div>
                  );
                })}
                {dirs.length === 0 && files.length === 0 && (
                  <div className="fm-empty">Aucun fichier</div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {showNewFolder && (
        <div className="fm-dialog-overlay" onClick={() => setShowNewFolder(false)}>
          <div className="fm-dialog-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="fm-dialog-title">Nouveau dossier</h3>
            <label className="fm-dialog-label" htmlFor="new-folder-input">
              Nom du dossier
            </label>
            <input
              id="new-folder-input"
              type="text"
              className="fm-input"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Nom du dossier"
              onKeyDown={(e) => e.key === 'Enter' && handleNewFolderSubmit()}
            />
            <div className="fm-dialog-footer">
              <button
                type="button"
                className="fm-btn fm-btn-default"
                onClick={() => setShowNewFolder(false)}
              >
                Annuler
              </button>
              <button type="button" className="fm-btn fm-btn-primary" onClick={handleNewFolderSubmit}>
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {renameTarget !== null && (
        <div className="fm-dialog-overlay" onClick={() => setRenameTarget(null)}>
          <div className="fm-dialog-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="fm-dialog-title">Renommer</h3>
            <p className="fm-dialog-description">
              <span className="fm-dialog-path">{renameTarget}</span>
            </p>
            <label className="fm-dialog-label" htmlFor="rename-input">
              Nouveau nom
            </label>
            <input
              id="rename-input"
              type="text"
              className="fm-input"
              value={renameNewName}
              onChange={(e) => setRenameNewName(e.target.value)}
              placeholder="Nouveau nom"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRenameSubmit();
                if (e.key === 'Escape') setRenameTarget(null);
              }}
            />
            <div className="fm-dialog-footer">
              <button
                type="button"
                className="fm-btn fm-btn-default"
                onClick={() => setRenameTarget(null)}
              >
                Annuler
              </button>
              <button type="button" className="fm-btn fm-btn-primary" onClick={handleRenameSubmit}>
                Renommer
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget !== null && (
        <div className="fm-dialog-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="fm-dialog-content fm-dialog-danger" onClick={(e) => e.stopPropagation()}>
            <h3 className="fm-dialog-title">Supprimer</h3>
            <p className="fm-dialog-description">
              Voulez-vous vraiment supprimer&nbsp;?
            </p>
            <p className="fm-dialog-path">{deleteTarget}</p>
            <div className="fm-dialog-footer">
              <button
                type="button"
                className="fm-btn fm-btn-default"
                onClick={() => setDeleteTarget(null)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="fm-btn fm-btn-destructive"
                onClick={handleDeleteConfirm}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
