import React, { useRef, useState, useEffect } from 'react';
import { Divider, Input, Button, Form, Modal } from 'antd';
import logo from '../../logo.png';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Text } from '../../Component/textModel';

function LoginUser() {
  const navigate = useNavigate();

  // input user code
  const hundleUserCode = useRef();

  // stats
  const [visible, setVisible] = useState(false);
  const [visibility, setVisiblity] = useState(true);
  const [loadings, setLoadings] = useState([]);

  // loading button
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  // show text Model
  const showModal = () => {
    setVisible(true);
  };
  //  next button
  const handleNext = (e) => {
    setVisiblity(false);
  };
  // start quiz button
  const handleOk = () => {
    enterLoading(0);
    const token = localStorage.getItem('token');
    axios
      .get('http://127.0.0.1:8000/api/settings/', {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      })
      .then((res) => {
        const minutes = res.data.settings[0].exam_time;
        localStorage.setItem('time', minutes);
        setTimeout(() => {
          navigate('/questions');
        }, 3000);
      })
      .catch(function (error) {});
  };
  // cacel Model button
  const handleCancel = () => {
    setVisiblity(true);
    setVisible(false);
  };

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
          showModal();
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
          <Modal
            visible={visible}
            title={
              <h4
                dir="rtl"
                style={{
                  fontSize: '1.5rem',
                  marginRight: '20px',
                  marginTop: '3px',
                }}
              >
                نموذج "البركة" المطوًر لمقياس هولاند لتحديد الميول والقدرات
                المهنية
              </h4>
            }
            onCancel={handleCancel}
            footer={
              visibility ? (
                <Button key="back" onClick={handleNext}>
                  التالي
                </Button>
              ) : (
                <Button
                  key="submit"
                  type="primary"
                  onClick={handleOk}
                  loading={loadings[0]}
                  // onClick={() => enterLoading(0)}
                >
                  ابدأ الاختبار
                </Button>
              )
            }
          >
            {visibility ? (
              <p dir="rtl" style={{ fontSize: '1.2rem' }}>
                {Text.text1}
              </p>
            ) : (
              <div>
                <p dir="rtl" style={{ fontSize: '1.2rem' }}>
                  {Text.text2}
                </p>
                <p dir="rtl" style={{ fontSize: '1.2rem' }}>
                  {Text.text3}
                </p>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
