import React from 'react';
import { Divider } from 'antd';
import logo from '../../logo.png';
import { Authenticated } from 'react-admin';

const Home = () => {
  return (
    <Authenticated>
      <div
        className="row justify-content-center "
        style={{
          backgroundColor: '#F6F6F6',
          padding: '60px 0',
          height: '100%',
        }}
      >
        <div className="col-3 text-center ">
          <img className="mb-5" src={logo} alt="albarakah"></img>

          <div className="row justify-content-center">
            <div className="col-10">
              <h5 style={{ color: '#A2A2A2', fontWeight: 'normal' }}>
                اهلاً بك
              </h5>
              <Divider />
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default Home;
