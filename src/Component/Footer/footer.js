import React from 'react';
import logo from '../../logo.png';
const Footer = () => {
  return (
    <div
      className="row mg-0 container pt-2 pb-2 align-items-center "
      style={{ direction: 'rtl', fontSize: '14px', color: '#9B8777' }}
    >
      <div className="col-md-1 col-sm-2 col-2 text-right  ">
        <img src={logo} alt="albarakah" style={{ width: '70%' }}></img>
      </div>
      <div className="col-md-5 col-sm-5 col-5 text-center ">
        © جمعية البركة للتنمية الاجتماعية 2021
      </div>

      <div className="col-md-6 col-sm-5 col-5 text-center">
        <a href="#" style={{ color: '#9B8777' }}>
          اتصل بنا
        </a>
        <span style={{ margin: '0 5px' }}>شروط الاستخدام سياسة الخصوصية</span>
      </div>
    </div>
  );
};

export default Footer;
