import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Finished = (props) => {
  const [score, setScore] = useState();
  const navigate = useNavigate();
  const student_id = localStorage.getItem('student');
  const token = localStorage.getItem('token');

  // GET ALL TYPES
  let types = [];
  {
    props.result.map((e) => types.push(e.t));
    types = types.filter((e, index) => {
      return types.indexOf(e) === index;
    });
  }
  //   SAVE RESULT ON DATABASE
  const svaeResult = async (score, student_id) => {
    await axios
      .post(
        'http://127.0.0.1:8000\\api\\store-result',
        {
          score: score,
          student_id: student_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === true) {
          localStorage.clear();
          swal({
            title: '! انتهينا',
            text: 'سوف نعرض لك النتيجة ',
            icon: 'success',
            button: ' حسناً',
          }).then(() => {
            props.getSumResult(Result);
          });
        }
        // res.data.status === false
      })
      .catch((error) => {
        if (
          error.response.data.status === false &&
          error.response.data.message === 'already has result'
        ) {
          swal({
            title: '! خطأ',
            text: 'لقد انجزت الإختبار مسبقا',
            icon: 'error',
            button: ' حسناً',
          }).then((e) => {
            navigate('/');
          });
        }
      });
  };

  // CONVERT RESULT TO STRING
  const resultToString = () => {
    var type = '';
    var result = '';
    var score = '';
    Result.map((e, id) => {
      type = e.type;
      result = e.sumResult;
      score += type;
      score += result;
    });
    setScore(score);
  };

  // CALC SUM OF RESULR FOR EVERY QUESTION AND ADD IT ON DATABASE
  const Result = [];

  const culcResults = () => {
    types.map((t) => {
      var sum = 0;
      props.result.map((e) => e.t === t && (sum += e.r));
      Result.push({
        type: t,
        sumResult: sum,
      });
    });
    resultToString();
    svaeResult(score, student_id);
  };

  return (
    <div
      className="row m-0  justify-content-center "
      style={{
        color: '#A6A6A6',
        backgroundColor: '#F6F6F6',
        height: '300px',
        alignItems: 'center',
      }}
    >
      <div className="col-6 text-center">
        <p style={{ fontSize: '50px', color: '#693C11' }}>
          هل متأكد تريد الإنتهاء؟
        </p>
        <Button
          onClick={culcResults}
          type="primary"
          block
          style={{
            backgroundColor: '#E1901E',
            width: '35%',
            margin: '25px',
            border: 'none',
          }}
        >
          إنهاء
        </Button>
      </div>
    </div>
  );
};

export default Finished;
