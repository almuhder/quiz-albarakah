import React from 'react';

const Result = (props) => {
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
      <div className="col-11  col-sx-10 col-md-8 col-lg-6 text-center">
        <p style={{ fontSize: '2rem', color: '#693C11' }}>
          :تم الإنتهاء من الإمتحان ، نتيجتك هي
        </p>
        {props.sumResult.map((e, index) => (
          <div key={index} style={{ fontSize: '20px' }}>
            <span>{e.type + '  : '}</span>
            <span>{e.sumResult}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
