import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default {
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
      .catch(function (error) {});

    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('tokenA');
      swal({
        title: '! خطأ',
        text: 'يجب تسجيل الدخول ',
        icon: 'error',
        button: 'حسناً',
      }).then((e) => {
        return Promise.reject();
      });
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
