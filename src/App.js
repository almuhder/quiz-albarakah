import './App.css';
import LoginUser from './Pages/LoginUser';
import Questions from './Pages/Questions';
import { Route, Routes } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Component/Footer/footer';

function App() {
  return (
    <div className="App font">
      <Routes>
        <Route path="/" exact element={<LoginUser />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
