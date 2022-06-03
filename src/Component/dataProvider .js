import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://127.0.0.1:8000/api/';
// const httpClient = fetchUtils.fetchJson;
var create = '';
var method = '';
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('tokenA');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

export default {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    resource === 'student-code' ? (method = 'POST') : (method = 'GET');

    const url = `${apiUrl}${resource}?${stringify(query)}`;
    // const token = localStorage.getItem('tokenA');
    return await httpClient(url, {
      method: method,
    }).then(({ headers, json }) => ({
      data: json.data,
      total: 10,
      // parseInt(headers.get('content-range').split('/').pop(), 10)
    }));
  },

  getOne: async (resource, params) =>
    (resource === 'student-code' ? (method = 'POST') : (method = 'GET')) &&
    (await httpClient(`${apiUrl}${resource}`, {
      method: method,
    }).then(({ json }) => ({
      data: json.data.find((e) => (e.id == params.id ? { e } : '')),
    }))),

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}${resource}?${stringify(query)}`;
    return await httpClient(url).then(({ json }) => ({ data: json.data }));
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}${resource}?${stringify(query)}`;

    return await httpClient(url).then(({ headers, json }) => ({
      data: json.data,
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },

  update: async (resource, params) =>
    await httpClient(`${apiUrl}${resource}/edit/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json.data })),

  // updateMany: async (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   return await httpClient(`${apiUrl}/${resource}/edit?${stringify(query)}`, {
  //     method: 'PUT',
  //     body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({ data: json.data }));
  // },

  create: async (resource, params) =>
    (resource === 'student-code' ? (create = 'generate') : (create = 'add')) &&
    (await httpClient(`${apiUrl}${resource}/${create}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.data.id },
    }))),

  delete: async (resource, params) =>
    await httpClient(`${apiUrl}${resource}/delete/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json.data })),

  // deleteMany: async (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   return await httpClient(`${apiUrl}${resource}/delete?${stringify(query)}`, {
  //     method: 'DELETE',
  //   }).then(({ json }) => ({ data: json.data }));
  // },
};
