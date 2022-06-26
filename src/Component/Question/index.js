import React, { useRef } from 'react';
import { useState } from 'react';
import { Button } from 'antd';

const Question = (props) => {
  const [Resultes, setResultes] = useState([]);

  const { question_data } = props;

  // HANDLE BUTTONS
  const handlebNo = useRef();
  const handlebOk = useRef();

  const currentQuestion = Resultes.find((q) => q.id === question_data.id);

  if (currentQuestion) {
    if (currentQuestion.r === 1) {
      handlebOk.current.style.backgroundColor = '#E1901E';
      handlebOk.current.style.color = 'white';
      handlebOk.current.disabled = true;
      handlebNo.current.disabled = true;
    } else {
      handlebNo.current.style.backgroundColor = '#E1901E';
      handlebNo.current.style.color = 'white';
      handlebOk.current.disabled = true;
      handlebNo.current.disabled = true;
    }
  } else {
    if (props.next) {
      handlebNo.current.style.backgroundColor = 'rgb(246, 246, 246)';
      handlebNo.current.style.color = '#FE788A';
      handlebOk.current.style.backgroundColor = 'rgb(246, 246, 246)';
      handlebOk.current.style.color = '#FE788A';
      handlebOk.current.disabled = false;
      handlebNo.current.disabled = false;
    }
  }
  props.getResultQuestion(Resultes);

  //  CALCULATE RESULT FOR QUESTION
  const calcResult = (type, id, result) => {
    Resultes.push({
      t: type,
      id: id,
      r: result,
    });
    setResultes(Resultes);
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
      <div className="col-11 col-sm-11 col-md-8 text-center">
        <p style={{ fontSize: '2rem', color: '#693C11' }}>
          {question_data.question_value}
        </p>
        <Button
          onClick={(e) => {
            calcResult(question_data.type.type_name, question_data.id, 0);
            e.target.style.backgroundColor = '#E1901E';
            e.target.style.color = 'white';
          }}
          style={{ backgroundColor: '#F6F6F6', width: '5rem', margin: '25px' }}
          danger
          ref={handlebNo}
        >
          لا
        </Button>
        <Button
          onClick={(e) => {
            calcResult(question_data.type.type_name, question_data.id, 1);
            e.target.style.backgroundColor = '#E1901E';
            e.target.style.color = 'white';
          }}
          style={{
            backgroundColor: '#F6F6F6',
            width: '5rem',
            margin: '25px',
          }}
          danger
          ref={handlebOk}
        >
          نعم
        </Button>
      </div>
    </div>
  );
};

export default Question;
