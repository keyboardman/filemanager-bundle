/**
 * Service API filesystem – appels via Axios.
 */
import axios from 'axios';

function createClient(apiBase) {
  const client = axios.create({ baseURL: apiBase });
  client.interceptors.response.use(
    (r) => r,
    (err) => {
      const msg =
        err.response?.data?.error ||
        (err.response?.status === 404
          ? "Route non trouvée. Vérifier que l'API est configurée dans le backend."
          : err.response?.statusText || err.message || 'Erreur serveur');
      return Promise.reject(new Error(msg));
    }
  );
  return client;
}

export function createFilesystemApi(apiBase = '/api/filesystem', filesystem = 'default') {
  const client = createClient(apiBase);

  return {
    list(params) {
      const q = new URLSearchParams({ filesystem });
      if (params.path) q.set('path', params.path);
      if (params.type) q.set('type', params.type);
      if (params.filterSearch) q.set('filter[search]', params.filterSearch);
      if (params.sort) q.set('sort', params.sort);
      return client.get('/list?' + q.toString()).then((r) => r.data);
    },
    upload(key, file) {
      const fd = new FormData();
      fd.append('filesystem', filesystem);
      fd.append('key', key);
      fd.append('file', file);
      return client.post('/upload', fd);
    },
    uploadMultiple(keyPrefix, files) {
      const fd = new FormData();
      fd.append('filesystem', filesystem);
      fd.append('key', keyPrefix);
      for (let i = 0; i < files.length; i++) fd.append('files[]', files[i]);
      return client.post('/upload-multiple', fd);
    },
    rename(source, target) {
      const fd = new FormData();
      fd.append('filesystem', filesystem);
      fd.append('source', source);
      fd.append('target', target);
      return client.post('/rename', fd);
    },
    delete(path) {
      const fd = new FormData();
      fd.append('filesystem', filesystem);
      fd.append('path', path);
      return client.post('/delete', fd);
    },
    createDirectory(path) {
      const fd = new FormData();
      fd.append('filesystem', filesystem);
      fd.append('path', path);
      return client.post('/create-directory', fd);
    },
    uploadPlaceholderFile(key, blob) {
      const fd = new FormData();
      fd.append('filesystem', filesystem);
      fd.append('key', key);
      fd.append('file', blob, 'keep.png');
      return client.post('/upload', fd);
    },
  };
}
