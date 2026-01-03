import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Sidebar from "./components/sidebar";
import Cargar_Categorias from "./components/cargar_categorias";
import Login from "./components/login";


function App() {

  return (
    <Router>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-h-screen ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cargar_categorias" element={<Cargar_Categorias />} />
            <Route path="/login-or-register" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
