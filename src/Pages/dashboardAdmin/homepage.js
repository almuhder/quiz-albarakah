import React from 'react';
import { Divider, Button } from 'antd';
import logo from '../../logo.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
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
            <h5 style={{ color: '#A2A2A2', fontWeight: 'normal' }}>اهلاً بك</h5>
            <Divider />
            <Button
              type="primary"
              style={{ backgroundColor: '#E1901E', border: 'none' }}
              onClick={() => navigate('/admin/change')}
            >
              !تغيير كلمة المرور
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
