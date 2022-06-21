import React, { useRef } from 'react';
import { Divider, Input, Button, Form } from 'antd';
import logo from '../../logo.png';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginUser() {
  const navigate = useNavigate();
  const hundleUserCode = useRef();

  // LOGIN
  const login = async () => {
    await axios
      .post('http://127.0.0.1:8000/api/login-student', {
        student_code: hundleUserCode.current.input.value,
      })
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem('token', res.data.data.token);
          localStorage.setItem('student', res.data.data.student.id);

          swal({
            title: '! نجاح',
            text: 'سوف نبدأ ',
            icon: 'success',
            button: ' حسناً',
          }).then((e) => {
            navigate('/questions');
          });
        }
      })
      .catch((err) => {
        if (err.message === 'Request failed with status code 404')
          swal({
            title: '! خطأ',
            text: 'المستخدم غير موجود',
            icon: 'error',
            button: 'حسناً',
          });
        if (err.response.data.message === 'Sorry, you take the quiz before')
          swal({
            title: '! خطأ',
            text: ' لقد انجزت الإختبار مسبقا, اطلب من الادارة تفعيل الكود الخاص بك',
            icon: 'error',
            button: ' حسناً',
          });
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
        <div className="col-md-3 col-sm-5 col-6 text-center ">
          <img className="mb-5" src={logo} alt="albarakah"></img>
          <h5 style={{ color: '#A2A2A2', fontWeight: 'normal' }}>
            الدخول لأداة تحديد الميول
          </h5>
          <div className="row justify-content-center">
            <div className="col-10">
              <Divider />
            </div>
          </div>
          <Form name="basic" onFinish={login}>
            <Form.Item
              name="usercode"
              rules={[{ required: true, message: ' ! يرجى ادخال الكود' }]}
            >
              <Input
                ref={hundleUserCode}
                value="4444"
                className="mb-4"
                placeholder="كود التفعيل"
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
                البدء
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
