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

  return(
    <div id = "Container" className="bg-gray-800 text-white flex justify-center items-center h-screen">
        <h1>Cargar Categorias</h1>
        <form className="">
            <input type="text" name="nombre" id="nombre" value = {formdata.nombre} onChange={handleChange}  placeholder="Nombre de categoria"/>
            <input type="text" name="descripcion" id="descripcion" value = {formdata.descripcion} onChange={handleChange} placeholder="Descripcion" />
            <input type="file" name="imagen" id="imagen" onChange={handleChange} />
        </form>
    </div>
  )
}

export default Cargar_Categorias;