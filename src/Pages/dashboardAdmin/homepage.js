import React, { useState, useEffect, useRef } from 'react';
import {
  Divider,
  Statistic,
  Table,
  Card,
  Button,
  Form,
  Input,
  Pagination,
} from 'antd';
import swal from 'sweetalert';
import logo from '../../logo.png';
import { Authenticated, number } from 'react-admin';
import axios from 'axios';
const { Column } = Table;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState();
  const [student, setStudent] = useState();
  const [activeStudent, setActiveStudent] = useState();
  const [nonActiveStudents, setNonActiveStudents] = useState();
  const [questions, setQuestions] = useState();
  const [types, setTypes] = useState();
  const [typeWithCountQuestion, setTypeWithCountQuestion] = useState();
  const token = localStorage.getItem('tokenA');
  const hudleTime = useRef();
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
    }, 3000);
  };

  // edit quiz time
  const editTime = () => {
    axios
      .post(
        'http://127.0.0.1:8000/api/settings/edit-time/1',
        {
          exam_time: hudleTime.current.input.value,
        },
        {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        }
      )
      .then((res) => {
        swal('تم تعديل مدة الاختبار', {
          buttons: false,
          timer: 2000,
        });
      });
  };

  useEffect(() => {
    // get number of {students,types ,questions,active student, non active student}
    axios
      .get('http://127.0.0.1:8000/api/settings/dash', {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      })
      .then((res) => {
        setStudent(res.data.data.countStudents);
        setActiveStudent(res.data.data.countActiveStudents);
        setNonActiveStudents(res.data.data.countNonActiveStudents);
        setQuestions(res.data.data.countQuestions);
        setTypes(res.data.data.countTypes);
        setTypeWithCountQuestion(res.data.data.countTypeWithCountQuestion);
      })
      .catch(function (error) {});

    // git quiz time
    axios
      .get('http://127.0.0.1:8000/api/settings/', {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      })
      .then((res) => {
        setTime(res.data.settings[0].exam_time);
        hudleTime.current.input.value = res.data.settings[0].exam_time;
        setLoading(false);
      })
      .catch(function (error) {});
  }, []);
  return (
    <Authenticated>
      <div
        className="row justify-content-center "
        style={{
          backgroundColor: '#F6F6F6',
        }}
      >
        <div className="col-lg-2  col-md-2 col-sm-10 col-10 text-center ">
          <img className="mb-4 mt-3" src={logo} alt="albarakah"></img>
        </div>
      </div>
      <div
        className="row justify-content-center"
        style={{ backgroundColor: '#F6F6F6', paddingBottom: '5rem' }}
      >
        <Divider />
        <div className="col-lg-2 col-md-4 col-sm-5 col-5 text-center ">
          <Card>
            <Statistic title="Student" value={student} loading={loading} />
          </Card>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-5 col-5 text-center">
          <Card>
            <Statistic
              title="Complete Quiz"
              value={(activeStudent / student) * 100}
              suffix="%"
              precision={2}
              loading={loading}
            />
          </Card>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-10 col-10 text-center">
          <Card>
            <Statistic
              title="Non Complete Quiz"
              value={(nonActiveStudents / student) * 100}
              suffix="%"
              precision={2}
              loading={loading}
            />
          </Card>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-5 col-5 text-center">
          <Card>
            <Statistic title="Questions" value={questions} loading={loading} />
          </Card>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-5 col-5 text-center">
          <Card>
            <Statistic title="Types" value={types} loading={loading} />
          </Card>
        </div>
      </div>
      <div
        className="row justify-content-center"
        style={{ backgroundColor: '#F6F6F6', paddingBottom: '5rem' }}
      >
        <div className="col-lg-7 col-md-7 col-sm-10 col-10">
          <Table
            dataSource={typeWithCountQuestion}
            loading={loading}
            scroll={{
              y: 240,
            }}
            pagination={false}
          >
            <Column title="Type" dataIndex="type_name" key="type_name" />
            <Column
              title="Number Questions"
              dataIndex="questions_count"
              key="questions_count"
            />
          </Table>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-10 col-10">
          <Card>
            <h5>Time Quiz</h5>
            <p>number minutes</p>
            <Form
              // ref={this.formRef}
              name="control-ref"
              onFinish={editTime}
            >
              <Form.Item
                name="time"
                rules={[
                  {
                    required: true,
                    message: 'Please input nymber of minutes!',
                  },
                ]}
              >
                <Input ref={hudleTime} type="number" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadings[0]}
                  onClick={() => enterLoading(0)}
                >
                  Edit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </Authenticated>
  );
};

export default Home;
