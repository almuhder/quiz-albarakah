import axios from 'axios';

export default {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    await axios
      .post('http://127.0.0.1:8000/api/login', {
        email: username,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.data.token);
        localStorage.setItem('tokenA', response.data.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });

    // accept all username/password combinations
    // return Promise.resolve();
  },
  // called when the user clicks on the logout button
  logout: async () => {
    const token = localStorage.getItem('tokenA');
    await axios
      .get('http://127.0.0.1:8000/api/logout', {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      })
      .then(function (response) {
        localStorage.removeItem('tokenA');
      })
      .catch(function (error) {
        console.log(error);
      });
    // localStorage.removeItem('tokenA');
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('tokenA');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem('tokenA')
      ? Promise.resolve()
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
