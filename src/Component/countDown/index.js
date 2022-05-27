import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Time from '../../Component/timeQuiz';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Timer = () => {
  const [time, setTime] = useState(Time);

  const navigate = useNavigate();
  let intervalRef = useRef();

  const timeCounter = () => {
    setTime((prev) => prev - 1);
  };

  useEffect(() => {
    intervalRef.current = setInterval(timeCounter, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return time >= 0 ? (
    <div>
      <span style={{ fontSize: '20px' }}>
        {time / 60 < 10 ? '0' : ''}
        {Math.floor(time / 60)}
      </span>
      <span style={{ fontSize: '20px' }}>
        {':'}
        {time % 60 < 10 ? '0' : ''}
        {time % 60}
      </span>
      <span style={{ fontSize: '20px' }}>{'   الوقت المتبقي '}</span>
    </div>
  ) : (
    swal(' لقد انتهى الوقت ', {
      buttons: false,
      timer: 3000,
    }) && navigate('/')
  );
};

export default Timer;
