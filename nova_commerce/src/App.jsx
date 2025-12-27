import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Sidebar from "./components/sidebar";


function App() {

  return (
    <Router>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-h-screen ">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
