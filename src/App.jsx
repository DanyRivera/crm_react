import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Inicio from './paginas/Inicio';
import NuevoCliente from './paginas/NuevoCliente';
import EditarCliente from './paginas/EditarCliente';
import VerCliente from './paginas/VerCliente';

function App() {

  useEffect(() => {

    if (window.location.pathname == '/') {
      window.location.replace(`${import.meta.env.VITE_APP_URL}`)
    }

  }, [])


  return (
    <BrowserRouter>

      <Routes>

        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerCliente />} />
        </Route>

      </Routes>

    </BrowserRouter>

  )
}

export default App
