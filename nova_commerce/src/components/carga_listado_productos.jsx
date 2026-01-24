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

    // Carga de Productos
    <div id="container" className="flex flex-row gap-90 justify-center items-start h-screen bg-gray-100">
        <section className="bg-white p-5 shadow-2xl rounded-lg w-md ">
            <form className="">
                <h1 className="flex justify-center items-center mb-4 text-xl">Cargar Producto</h1>
                <label htmlFor="nombre" className="block mb-3">Nombre del producto</label>
                <input type="text" name="nombre" id="nombre" placeholder="Nombre del producto" className="w-full px-4 py-2 border border-gray-300" required/>

                <label htmlFor="descripcion" className="block mb-1.5 mt-3.5 ">Descripción</label>
                <textarea name="descripcion" id="descripcion" className="bg-white w-full h-40 border px-2 py-1.5 scroll-auto border-gray-300" placeholder="Descripcion" required></textarea>

                <label htmlFor="precio" className=" block mb-1.5 mt-3">Precio</label>
                <input type="number" name="precio" id="precio" placeholder="Precio del producto" className="w-full px-4 py-2 border border-gray-300" min={0} required/>

                <label htmlFor="categoriaId" className=" block mb-1.5 mt-3">Categoría</label>
                <select name="categoriaId" id="categoriaId" className="w-full px-4 py-2 border border-gray-300 h-max-[100] overflow-y-auto mb-3" required>
                    <option value="">Seleccionar categoría</option>
                    <option value="">Seleccionar categoría</option>
                    <option value="">Seleccionar categoría</option>
                    <option value="">Seleccionar categoría</option>
                    <option value="">Seleccionar categoría</option>
                    <option value="">Seleccionar categoría</option>
                </select>

                <label htmlFor="archivo" className="block mb-1.5 mt-3">Imagen del producto</label>
                <input type="file" name="archivo" id="archivo" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" required/>
                
                <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4">Cargar Producto</button>
            </form>
        </section>

        {/* Listado de productos cargados */}
        <section className=" relative
         bg-white flex p-4 rounded shadow-md max-w-[800px] max-h-[600px] overflow-auto top-4.5" >
          <table className="border-collapse border border-black ">
            <thead>
              <tr>
                <th className="border border-black px-4 py-3 text-lg">Nombre</th>
                <th className="border border-black px-4 py-3 text-lg">Descripción</th>
                <th className="border border-black px-4 py-3 text-lg">Precio</th>
                <th className="border border-black px-4 py-3 text-lg">Categoria</th>
                <th className="border border-black px-4 py-3 text-lg">Imagen</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }).map((_, i) => (
        <tr key={i}>
          <td className="border px-4 py-2">Producto {i}</td>
          <td className="border px-4 py-2">Descripción larga {i}</td>
          <td className="border px-4 py-2">$999</td>
          <td className="border px-4 py-2">$999</td>
          <td className="border px-4 py-2">$999</td>
        </tr>
      ))}
            </tbody>
          </table>
        </section>
    </div>
  )
}

export default Productos;