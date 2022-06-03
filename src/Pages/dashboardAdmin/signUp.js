import React, { useRef } from 'react';
import { Divider, Input, Button, Form } from 'antd';
import logo from '../../logo.png';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const hundleEmail = useRef();
  const hundlePassword = useRef();

  // LOGIN
  const signup = async () => {
    await axios
      .post('http://127.0.0.1:8000/api/signup', {
        email: hundleEmail.current.input.value,
        password: hundlePassword.current.input.value,
      })
      .then((res) => {
        if (res.data.status) {
          swal({
            title: '! نجاح',
            text: 'تم التسجيل ',
            icon: 'success',
            button: ' حسناً',
          }).then((e) => {
            navigate('/admin');
          });
        }
      })
      .catch((err) => {
        const errors = err.response.data.errors;

        if (
          'email' in errors &&
          errors.email[0] === 'The email has already been taken.'
        ) {
          swal({
            title: '! خطأ',
            text: 'الايميل غير متاح',
            icon: 'error',
            button: 'حسناً',
          });
        } else if ('password' in errors) {
          swal({
            title: '! خطأ',
            text: 'يجب ان لا تقل كلمة المرور عن 8 محارف وان تحوي احرف صغيرة و ارقام و رموز',
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
                التسجيل كمدير
              </h5>
              <Divider />
            </div>
          </div>
          <Form name="basic" onFinish={signup}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: '! يجب ادخال الايميل' }]}
            >
              <Input
                ref={hundleEmail}
                type={'email'}
                value=""
                className="mb-4"
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
                className="mb-4"
                placeholder=" كلمة المرور"
                style={{ textAlign: 'right' }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ backgroundColor: '#E1901E', border: 'none' }}
              >
                التسجيل
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
