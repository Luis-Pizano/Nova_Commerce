import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Sidebar from "./components/sidebar";
import Cargar_Categorias from "./components/cargar_categorias";
import Productos from "./components/carga_listado_productos";
import Marcas from "./components/carga_marcas";
import Login from "./components/login";


function App() {

  return (
    <Router>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 bg-gray-100 h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cargar_categorias" element={<Cargar_Categorias />} />
            <Route path="/cargar_productos" element={<Productos />} />
            <Route path="/cargar_marcas" element={<Marcas />} />
            <Route path="/login-or-register" element={<Login />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  )
}

export default App
