import { useState, useEffect } from "react";

const Cargar_Categorias = () => {
  const [formdata, setFormdata] = useState({
    nombre: "",
    descripcion: "",
    imagen: null
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  }

  // Cargar Categorias API Call
  const cargar_categoria = async () =>{
    try {
      const response = await fetch('http://localhost:5000/api/cargar_categorias', {
        method: 'POST',
         headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
      });
      const data = await response.json();
      if (response.ok) {
        setFormdata({
          nombre: "",
          descripcion: "",
          imagen: null})
      }      
    } catch (error) {
      console.error(`Error al cargar categoria: ${error}`)
    }
  }

  return (

    // Cargar Categorias

    <div id="Container" className=" flex flex-row gap-110 justify-center items-center h-screen bg-gray-100">
      <div className="">
        <form className=" justify-start items-start flex flex-col gap-4 bg-white p-6 rounded shadow-md" onSubmit={cargar_categoria}>
          <h1 className="text-2xl font-bold mb-6 text-center">Cargar Categorias</h1>
          <input type="text" name="nombre" id="nombre" value={formdata.nombre} onChange={handleChange} placeholder="Nombre de categoria" className="bg-white w-full border px-1 py-1.5" />
          <textarea name="descripcion" id="descripcion" value={formdata.descripcion} onChange={handleChange} placeholder="Descripcion" className="bg-white w-full h-100 border px-1 py-1.5 scroll-auto"></textarea>
          <input type="file" name="imagen" id="imagen" onChange={handleChange} className="bg-white w-full border" />
          <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4">Cargar</button>
        </form>
      </div>


      {/* Tabla de categorias cargadas */}

      <div className="bg-white p-6 rounded shadow-md">
        <table className="border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-3 text-lg">Nombre</th>
              <th className="border border-black px-4 py-3 text-lg">Descripción</th>
              <th className="border border-black px-4 py-3 text-lg">Imagen</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border border-black px-4 py-2">Ejemplo</td>
              <td className="border border-black px-4 py-2">Descripción larga</td>
              <td className="border border-black px-4 py-2">img.png</td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>

  )
}

export default Cargar_Categorias;