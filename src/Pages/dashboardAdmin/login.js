import React, { useRef, useState } from 'react';
import { Divider, Input, Button, Form } from 'antd';
import logo from '../../logo.png';
import swal from 'sweetalert';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  // HANDLEING INPUTS
  const hundleEmail = useRef();
  const hundlePassword = useRef();

  const [loadings, setLoadings] = useState([]);

  // LOADING BUTTON (FORGET PASSWORD)
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  // FORGET PASSWORD FOR ADMIN
  const forget = async () => {
    enterLoading(0);
    const email = hundleEmail.current.input.value;
    await axios
      .post('http://127.0.0.1:8000/api/forgot-password', {
        email: email,
      })
      .then((res) => {
        if (res.data.status === true) {
          localStorage.setItem('emailA', email);
          swal({
            title: '! نجاح',
            text: 'تم ارسال الكود الى الايميل ',
            icon: 'success',
            button: 'حسناً',
          }).then((e) => {
            navigate('/admin/reset');
          });
        }
      })
      .catch((err) => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[0] = false;
          return newLoadings;
        });

        const errors = err.response.data.errors;

        if (
          'email' in errors &&
          errors.email[0] === "We can't find a user with that email address."
        ) {
          swal({
            title: '! خطأ',
            text: 'الايميل غير موجود',
            icon: 'error',
            button: 'حسناً',
          });
        } else if (
          'email' in errors &&
          errors.email[0] === 'The email field is required.'
        ) {
          swal({
            title: '! خطأ',
            text: 'يجب ادخال الايميل',
            icon: 'error',
            button: 'حسناً',
          });
        }
      });
  };

  // LOGIN ADMIN
  const login = async () => {
    await axios
      .post('http://127.0.0.1:8000/api/login', {
        email: hundleEmail.current.input.value,
        password: hundlePassword.current.input.value,
      })
      .then(function (response) {
        if (response.data.status) {
          localStorage.setItem('tokenA', response.data.data.token);
          swal({
            title: '! نجاح',
            text: ' تم تسجيل الدخول',
            icon: 'success',
            button: ' حسناً',
          }).then((e) => {
            navigate('/admin');
          });
        }
      })
      .catch(function (error) {
        if (error.response.data.message === 'Incorrect password') {
          swal({
            title: '! خطأ',
            text: 'كلمة المرور غير صحيحة',
            icon: 'error',
            button: 'حسناً',
          });
        } else if (error.response.data.message === 'User Not Found') {
          swal({
            title: '! خطأ',
            text: 'الحساب غير موجود',
            icon: 'error',
            button: 'حسناً',
          });
        }
      });
  };

  return (
    <div>
      <div
        className="row justify-content-center "
        style={{
          backgroundColor: '#F6F6F6',
          padding: '60px 0',
          marginRight: '0px',
        }}
      >
        <div className="col-3 text-center ">
          <img className="mb-5" src={logo} alt="albarakah"></img>
          <div className="row justify-content-center">
            <div className="col-10">
              <h5 style={{ color: '#A2A2A2', fontWeight: 'normal' }}>
                تسجيل الدخول
              </h5>
              <Divider />
            </div>
          </div>
          <Form name="basic" onFinish={login}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '! يجب ادخال الايميل' },
                {
                  type: 'email',
                  message: ' ادخال غير صحيح , يجب ادخال ايميل',
                },
              ]}
            >
              <Input
                ref={hundleEmail}
                type={'email'}
                value=""
                className="mt-4"
                placeholder="الايميل"
                style={{ textAlign: 'right' }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: ' ! يجب ادخال كلمة المرور' }]}
            >
              <Input
                ref={hundlePassword}
                value=""
                type={'password'}
                className="mt-4"
                placeholder=" كلمة المرور"
                style={{ textAlign: 'right' }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="mt-4"
                style={{ backgroundColor: '#E1901E', border: 'none' }}
              >
                دخول
              </Button>
            </Form.Item>
          </Form>

          <Button
            type="primary"
            className="mb-3"
            style={{ backgroundColor: '#E1901E', border: 'none' }}
            loading={loadings[0]}
            onClick={forget}
          >
            !نسيت كلمة المرور
          </Button>
          <p>
            {'    ليس لدي حساب   '}
            <Link to="/admin/signup" style={{ textDecoration: 'none' }}>
              التسجيل
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
