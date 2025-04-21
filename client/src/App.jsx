import Home from './pages/Home/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const routes = (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    </BrowserRouter>
  );

  return (
    <>
      <Navbar />

      {routes}
    </>
  );
};

export default App;
