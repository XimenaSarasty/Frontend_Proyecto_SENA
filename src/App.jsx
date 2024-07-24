import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Contras_1 from './pages/Contras_1.jsx';
import Contras_2 from './pages/Contras_2.jsx';
import Contra_3 from './pages/Contras_3.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Usuarios from './pages/Usuarios.jsx';
import Roles from './pages/Roles.jsx';
import Categorias from './pages/Categorias.jsx';
import Instructores from './pages/Instructores.jsx';
import Fichas from './pages/Fichas.jsx';
import ImportExcel from './pages/ImportExcel.jsx';
import Subcategorias from './pages/Subcategorias.jsx';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/contras_1' element={<Contras_1 />} />
          <Route path='/contras_2' element={<Contras_2 />} />
          <Route path='/contras_3' element={<Contra_3 />} />
          <Route path='/usuarios' element={<Usuarios />} /> 
          <Route path='/roles' element={<Roles />} /> 
          <Route path='/categorias' element={<Categorias />} />
          <Route path='/subcategorias' element={<Subcategorias />} />
          <Route path='/instructores' element={<Instructores/>}/>
          <Route path='/fichas' element={<Fichas/>}/> 
          <Route path='/excel' element={<ImportExcel/>}/> 

          {/* <Route element={<ProtectedRoute />}> */}
            <Route path='/home' element={<Home />} />            
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
