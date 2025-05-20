import Home from './pages/Home/Home';
import { Route, Routes } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
