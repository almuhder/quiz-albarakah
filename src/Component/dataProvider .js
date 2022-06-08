import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import axios from 'axios';
import swal from 'sweetalert';

// api url
const apiUrl = 'http://127.0.0.1:8000/api/';

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
  // get list of items
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

    return await httpClient(url, {
      method: method,
    }).then(({ headers, json }) => ({
      data: json.data,
      total: 10,
      // parseInt(headers.get('content-range').split('/').pop(), 10)
    }));
  },
  // git one of items
  getOne: async (resource, params) =>
    (resource === 'student-code' ? (method = 'POST') : (method = 'GET')) &&
    (await httpClient(`${apiUrl}${resource}`, {
      method: method,
    }).then(({ json }) => ({
      data: json.data.find((e) => (e.id == params.id ? { e } : '')),
    }))),

  // git many of items
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
  // edit item
  update: async (resource, params) => {
    const data = {};
    const token = localStorage.getItem('tokenA');
    await axios({
      method: 'put',
      url: `${apiUrl}${resource}/edit/${params.id}`,
      data: params.data,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (data['data'] = res.data.data))
      .catch((err) => {
        if (
          (err.response.status === 500 &&
            err.response.data.message === 'this type already exists') ||
          err.response.data.message === 'this student already exists'
        ) {
          swal({
            title: '! خطأ',
            text: 'لا يمكن تكرار هذا الحقل ',
            icon: 'error',
            button: 'حسناً',
          });
        }
      });
    return data;
  },

  // updateMany: async (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   return await httpClient(`${apiUrl}/${resource}/edit?${stringify(query)}`, {
  //     method: 'PUT',
  //     body: JSON.stringify(params.data),
  //   }).then(({ json }) => ({ data: json.data }));
  // },

  //  create new item
  create: async (resource, params) => {
    const data = {};
    const token = localStorage.getItem('tokenA');
    (resource === 'student-code' ? (create = 'generate') : (create = 'add')) &&
      (await axios
        .post(`${apiUrl}${resource}/${create}`, params.data, {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        })
        .then(
          (res) => (data['data'] = { ...params.data, id: res.data.data.id })
        )
        .catch((err) => {
          if (
            (err.response.status === 500 &&
              err.response.data.message === 'this type already exists') ||
            err.response.data.message === 'this student already exists'
          ) {
            swal({
              title: '! خطأ',
              text: 'لا يمكن تكرار هذا الحقل ',
              icon: 'error',
              button: 'حسناً',
            });
          }
        }));
    return data;
  },

  // delete item
  delete: async (resource, params) => {
    const data = {};
    const token = localStorage.getItem('tokenA');
    await axios
      .delete(`${apiUrl}${resource}/delete/${params.id}`, {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      })
      .then((res) => (data['data'] = res.data));
    return data;
  },

  // deleteMany: async (resource, params) => {
  //   const query = {
  //     filter: JSON.stringify({ id: params.ids }),
  //   };
  //   return await httpClient(`${apiUrl}${resource}/delete?${stringify(query)}`, {
  //     method: 'DELETE',
  //   }).then(({ json }) => ({ data: json.data }));
  // },
};
