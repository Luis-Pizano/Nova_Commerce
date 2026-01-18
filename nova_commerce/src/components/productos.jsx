import { useState,useEffect } from "react";

const Productos = () => {
  const [formdata, setFormdata] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoriaId: "",
    file: null
  });

  return(
    <div id="container" className="flex flex-row gap-110 justify-center items-center h-screen bg-gray-100">
        <section className="bg-white p-7 shadow-2xl rounded-lg w-md">
            <form action="">
                <h1 className="flex justify-center items-center mb-4 text-xl">Cargar Producto</h1>
                <label htmlFor="nombre" className="mb-3">Nombre del producto</label>
                <input type="text" name="nombre" id="nombre" placeholder="Nombre del producto" className="w-full px-4 py-2 border border-gray-300" required/>

                <label htmlFor="descripcion" className="mt-3">Descripción</label>
                <textarea name="descripcion" id="descripcion" className="bg-white mt-6 w-full h-40 border px-2 py-1.5 scroll-auto border-gray-300" required></textarea>

                <label htmlFor="precio" className="mt-3">Precio</label>
                <input type="number" name="precio" id="precio" placeholder="Precio del producto" className="w-full px-4 py-2 border border-gray-300" min={0} required/>

                <label htmlFor="categoriaId" className="mt-3">Categoría</label>
                <select name="categoriaId" id="categoriaId" className="w-full px-4 py-2 border border-gray-300 h-max-[100px] overflow-y-auto mb-3" required>
                    <option value="">Seleccionar categoría</option>
                    <option value="">Seleccionar categoría</option>
                    <option value="">Seleccionar categoría</option>
                    <option value="">Seleccionar categoría</option>
                    <option value="">Seleccionar categoría</option>
                    <option value="">Seleccionar categoría</option>
                </select>

                <label htmlFor="archivo" className="mt-3">Imagen del producto</label>
                <input type="file" name="archivo" id="archivo" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" required/>
                
                <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4">Cargar Producto</button>
            </form>
        </section>
    </div>
  )
}

export default Productos;