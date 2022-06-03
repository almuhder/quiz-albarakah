import React from 'react';
import logo from '../../logo.png';
import { Button } from 'antd';
import Question from '../../Component/Question';
import Finished from '../../Component/Finished';
import Result from '../../Component/Result';
import axios from 'axios';
import swal from 'sweetalert';
import { Spin } from 'antd';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Timer from '../../Component/countDown';

// GET qUESTIONS FROM SERVER
function Questions() {
  const [isloading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios
        .get(
          'http://127.0.0.1:8000/api/question',

          {
            headers: {
              Authorization: `Bearer  ${token}`,
            },
          }
        )
        .then((res) => {
          const questiones = res.data;
          setQuestions(questiones.data);
          setLoading(false);

          // console.log(res.data.data[0].question_value);
        })
        .catch(function (error) {
          // console.log('Error', error.message);
        });
    } else {
      swal({
        title: '! خطأ',
        text: 'يجب عليك تسجيل الدخول',
        icon: 'error',
        button: ' حسناً',
      }).then(() => {
        navigate('/');
      });
    }
  }, []);

  const [Questions, setQuestions] = useState([]);
  const [Results, setResults] = useState([]);
  const [sumResult, setSumResult] = useState([]);
  const [Case, setCase] = useState('play');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [visible, setVisible] = useState('visible');
  const [next, setNext] = useState(false);

  // GET RESULT FOR EVERY QUESTION
  const getResultQuestion = (r) => {
    setResults(r);
  };

  // GET SUM RESULT FOR EXAM
  const getSumResult = (r) => {
    setSumResult(r);
    setCase('result');
  };

  //  GO TO NEXT QUESTION
  const nextQuestion = () => {
    setNext(true);
    setVisible('visible');
    if (Questions.length > currentQuestion + 1) {
      const r = Results.find((e) => e.id === Questions[currentQuestion].id);
      if (r) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        swal(' يجب عليك اختيار اجابة', {
          buttons: false,
          timer: 1000,
        });
      }
    } else setCase('finish');
  };

  //   GO TO PREVIUS QUESTION
  const previusQuestion = () => {
    Case === 'finish'
      ? setCase('play') && setCurrentQuestion(Questions.length)
      : currentQuestion > 0
      ? setCurrentQuestion(currentQuestion - 1)
      : setCurrentQuestion(currentQuestion);
    setVisible('hidden');
  };

  // RENDER
  const render = () => {
    if (isloading) {
      return (
        <div
          className="row m-0  "
          style={{
            backgroundColor: '#F6F6F6',
            padding: '10px 50px ',
            height: '300px',
            alignItems: 'center',
          }}
        >
          <Spin tip="Loading..." size="large" />
        </div>
      );
    } else {
      return Case === 'play' ? (
        <Question
          next={next}
          getResultQuestion={getResultQuestion}
          question_data={Questions[currentQuestion]}
        />
      ) : Case === 'finish' ? (
        <Finished result={Results} getSumResult={getSumResult} />
      ) : (
        <Result sumResult={sumResult} />
      );
    }
  };

  return (
    <div className="m-0">
      <div className="row m-0 pt-5 pb-3 justify-content-end ">
        <div className="col-2  text-right ">
          <Link to={'/'}>
            <img src={logo} alt="albarakah" style={{ width: '50%' }}></img>
          </Link>
        </div>
      </div>

      <div>
        <div
          className="row m-0  "
          style={{
            color: '#A6A6A6',
            backgroundColor: '#F6F6F6',
            padding: '10px 50px ',
            height: '100px',
            alignItems: 'center',
          }}
        >
          <div className="col">{Case === 'play' && <Timer />}</div>
        </div>

        {render()}

        <div
          className="row m-0   justify-content-between "
          style={{
            color: '#A6A6A6',
            backgroundColor: '#F6F6F6',
            height: '100px',
            alignItems: 'center',
          }}
        >
          <div className="col-6 text-center">
            {Case === 'play' ? (
              <Button
                onClick={previusQuestion}
                style={{
                  backgroundColor: '#F6F6F6',
                  width: '50%',
                  visibility: visible,
                }}
                danger
              >
                السابق
              </Button>
            ) : (
              ''
            )}
          </div>
          <div className="col-6 text-center">
            {Case !== 'play' ? (
              ''
            ) : (
              <Button
                onClick={nextQuestion}
                style={{ backgroundColor: '#F6F6F6', width: '50%' }}
                danger
              >
                التالي
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
