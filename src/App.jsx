import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Login from './pages/Login.jsx';
import Contras_1 from './pages/Contras_1.jsx';
import Contras_2 from './pages/Contras_2.jsx';
import Contra_3 from './pages/Contras_3.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/contras_1' element={<Contras_1 />} />
          <Route path='/contras_2' element={<Contras_2 />} />
          <Route path='/contras_3' element={<Contra_3 />} />
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path='/home' element={<Home />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
