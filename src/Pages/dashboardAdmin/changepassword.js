import React, { useRef } from 'react';
import { Divider, Input, Button, Form } from 'antd';
import logo from '../../logo.png';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const navigate = useNavigate();
  // HANDLEING INPUTS
  const hundleOldPassword = useRef();
  const hundleNewPassword = useRef();
  // CHANGE PASSWORD
  const changepassword = async () => {
    const token = localStorage.getItem('tokenA');
    await axios
      .post(
        'http://127.0.0.1:8000/api/change-password',
        {
          old_password: hundleOldPassword.current.input.value,
          new_password: hundleNewPassword.current.input.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          swal({
            title: '! نجاح',
            text: 'تم تغيير كلمة المرور بنجاح',
            icon: 'success',
            button: ' حسناً',
          }).then((e) => {
            localStorage.removeItem('tokenA');
            navigate('/admin');
          });
        }
      })
      .catch((err) => {
        if (err.response.data.message === 'the old password does not match') {
          swal({
            title: '! خطأ',
            text: 'كلمة المرور الحالية خاطئة',
            icon: 'error',
            button: ' حسناً',
          });
        } else if (err.response.data.message === 'Unauthenticated.') {
          swal({
            title: '! خطأ',
            text: 'يجب تسجيل الدخول',
            icon: 'error',
            button: 'حسناً',
          }).then((e) => {
            navigate('/admin/login');
          });
        } else {
          swal({
            title: '! خطأ',
            text: 'يجب ان لا تقل عن 8 محارف وان تحوي احرف صغيرة و ارقام و رموز',
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
                تغيير كلمة المرور
              </h5>
              <Divider />
            </div>
          </div>
          <Form name="basic" onFinish={changepassword}>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: ' ! يجب ادخال كلمة المرور الحالية' },
              ]}
            >
              <Input
                ref={hundleOldPassword}
                value=""
                type={'password'}
                className="mt-4"
                placeholder="  كلمة المرور الحالية"
                style={{ textAlign: 'right' }}
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: ' ! يجب ادخال كلمة المرور الجديدة' },
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
                ref={hundleNewPassword}
                value=""
                type={'password'}
                className="mt-4"
                placeholder=" كلمة المرور الجديدة"
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
                تأكيد
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
