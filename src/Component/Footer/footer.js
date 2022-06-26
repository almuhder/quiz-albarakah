import React from 'react';
import logo from '../../logo.png';
const Footer = () => {
  return (
    <div
      className="row mg-0 container pt-2 pb-2 align-items-center "
      style={{ direction: 'rtl', fontSize: '14px', color: '#9B8777' }}
    >
      <div className="col-md-1 col-sm-2 col-12 text-center  ">
        <img src={logo} alt="albarakah" style={{ width: '3rem' }}></img>
      </div>
      <div className="col-md-5 col-sm-5 col-12 text-center pt-2">
        <p style={{ fontSize: '1rem' }}>
          © جمعية البركة للتنمية الاجتماعية 2021
        </p>
      </div>

      <div className="col-md-6 col-sm-5 col-12 text-center pt-2 ">
        <p style={{ fontSize: '1rem' }}>
          شروط الاستخدام سياسة الخصوصية
          <a
            href="#"
            style={{ color: '#9B8777', fontSize: '1rem', margin: '0 5px' }}
          >
            اتصل بنا
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
