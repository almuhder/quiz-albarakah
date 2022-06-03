import LoginUser from './Pages/LoginUser';
import Questions from './Pages/Questions';
import { Route, Routes } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Component/Footer/footer';
import DashboardAdmin from './Pages/dashboardAdmin/admin';
import SignUp from './Pages/dashboardAdmin/signUp';
import ResetPassword from './Pages/dashboardAdmin/resetpassword';
import ChangePassword from './Pages/dashboardAdmin/changepassword';

function App() {
  return (
    <div className="App font">
      <Routes>
        <Route path="/" exact element={<LoginUser />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/admin/*" element={<DashboardAdmin />} />
        <Route path="/admin/signup" element={<SignUp />} />
        <Route path="/admin/reset" element={<ResetPassword />} />
        <Route path="/admin/change" element={<ChangePassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
