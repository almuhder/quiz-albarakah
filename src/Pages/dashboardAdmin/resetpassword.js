import React, { useRef } from 'react';
import { Divider, Input, Button, Form } from 'antd';
import logo from '../../logo.png';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  // HANDLEING INPUTS
  const hundleEmail = useRef();
  const hundlePassword = useRef();
  const hundleConfirmPassword = useRef();
  const hundleToken = useRef();

  // EMAIL ADMIN FOR RESET IT
  const email = localStorage.getItem('emailA');
  // RESET PASSWORD
  const reset = async () => {
    await axios
      .post('http://127.0.0.1:8000/api/reset-password', {
        email: hundleEmail.current.input.value,
        password: hundlePassword.current.input.value,
        password_confirmation: hundleConfirmPassword.current.input.value,
        token: hundleToken.current.input.value,
      })
      .then((res) => {
        if (res.data.status) {
          swal({
            title: '! نجاح',
            text: 'تم اعادة تعيين كلمة المرور بنجاح',
            icon: 'success',
            button: ' حسناً',
          }).then((e) => {
            localStorage.removeItem('emailA');
            navigate('/admin');
          });
        }
      })
      .catch((err) => {
        if (
          err.response.data.message === 'This password reset token is invalid.'
        ) {
          swal({
            title: '! خطأ',
            text: ' اصبح غير فعال اعد المحاولة مجددا token',
            icon: 'error',
            button: 'حسناً',
          }).then((e) => {
            navigate('/admin/login');
          });
        } else if (
          'errors' in err.response.data &&
          'password' in err.response.data.errors
        ) {
          if (
            err.response.data.errors.password[0] ===
            'The password confirmation does not match.'
          ) {
            swal({
              title: '! خطأ',
              text: 'تأكيد كلمة المرور خاطئ',
              icon: 'error',
              button: 'حسناً',
            });
          } else {
            swal({
              title: '! خطأ',
              text: 'يجب ان لا تقل كلمة المرور عن 8 محارف وان تحوي احرف صغيرة و ارقام و رموز',
              icon: 'error',
              button: 'حسناً',
            });
          }
        } else if (
          err.response.data.message ===
          "We can't find a user with that email address."
        ) {
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
                اعادة تعيين كلمة المرور
              </h5>
              <Divider />
            </div>
          </div>
          <Form name="basic" onFinish={reset} initialValues={{ email: email }}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: '! يجب ادخال الايميل' }]}
            >
              <Input
                disabled
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
              rules={[
                { required: true, message: ' ! يجب ادخال كلمة المرور' },
                {
                  pattern: '^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
                  message:
                    '  ! يجب ان تحتوي كلمة المرور على احرف وارقام ورموز ',
                },
                {
                  min: 8,
                  message: 'يجب ان لا تقل كلمة المرور عن 8 محارف',
                },
                {
                  max: 18,
                  message: 'يجب ان لا تزيد كلمة المرور عن 18 محرف',
                },
              ]}
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
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: ' ! يجب ادخال كلمة المرور' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('تأكيد كلمة المرور خاطئ'));
                  },
                }),
              ]}
            >
              <Input
                ref={hundleConfirmPassword}
                value=""
                type={'password'}
                className="mt-4"
                placeholder="تاكيد كلمة المرور"
                style={{ textAlign: 'right' }}
              />
            </Form.Item>
            <Form.Item
              name="token"
              rules={[{ required: true, message: ' !token يجب ادخال  ' }]}
            >
              <Input
                ref={hundleToken}
                value=""
                type={'text'}
                className="mt-4"
                placeholder=" token"
                style={{ textAlign: 'right' }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="mt-4"
                type="primary"
                htmlType="submit"
                block
                style={{ backgroundColor: '#E1901E', border: 'none' }}
              >
                تأكيد
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
