import { useState, useEffect } from "react";

const Cargar_Categorias = () => {
  const [formdata, setFormdata] = useState({
    nombre: "",
    descripcion: "",
    file: null
  });

  const [editFormData, setEditFormData] = useState({
    nombre: "",
    descripcion: "",
    file: null
  });

  const [id, setId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [categorias, setCategorias] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormdata({
      ...formdata,
      [name]: files ? files[0] : value
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    setEditFormData({
      ...editFormData,
      [name]: files ? files[0] : value
    });
  };



  // Cargar Categorias API Call
  const cargar_categoria = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("nombre", formdata.nombre);
      form.append("descripcion", formdata.descripcion);
      form.append("file", formdata.file);

      const response = await fetch('http://localhost:8080/api/cargar_categorias', {
        method: 'POST',
        body: form
      });
      const data = await response.json();
      if (response.ok) {
        setFormdata({
          nombre: "",
          descripcion: "",
          file: null
        })
      }
    } catch (error) {
      console.error(`Error al cargar categoria: ${error}`)
    }
  }

  // Obtener Categorias API Call

  const obtener_categorias = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/obtener_categorias');
      const data = await response.json();
      if (response.ok) {
        console.log("Exito en Select de categorias", data);
        setCategorias(data);
      }
    } catch (error) {
      console.error(`Error al obtener categorias: ${error}`);
    }
  }

  useEffect(() => {
    obtener_categorias();
  }, []);

  const ModalUpdate = (categoria) => {
    setModalOpen(true);
    setId(categoria.ID);
    setEditFormData({
      nombre: categoria.NOMBRE,
      descripcion: categoria.DESCRIPCION,
      file: null
    });

  }

  const ModalDelete = (categoria) => {
    setModalDelete(true);
    setId(categoria.ID);
    setFormdata({
      nombre: categoria.NOMBRE
    });


  }
  
  const CloseDeleteModal = () => { 
    setModalDelete(false);
  }
  // API eliminar categoria

  const eliminar_categoria = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/eliminar_categoria/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        obtener_categorias();a
      }
    } catch (error) {
      console.error(`Error al eliminar categoria: ${error}`);
    }
  }

  // API actualizar categoria

  const actualizar_categoria = async (e) => {
    e.preventDefault();
    if (!editFormData.file) {
          alert("Debe seleccionar una imagen para actualizar la categoria.");
        }
        
    try {
      const form = new FormData();
      form.append("nombre", editFormData.nombre);
      form.append("descripcion", editFormData.descripcion);
      form.append("file", editFormData.file);
      
      const response = await fetch(`http://localhost:8080/api/actualizar_categoria/${id}`, {
        method: 'PUT',
        body: form
      });

      if (response.ok) {
        setModalOpen(false);
        obtener_categorias();
      }
      
    } catch (error) {
      console.error(`Error al actualizar categoria: ${error}`);
    }
  }

  return (

    // Cargar Categorias

    <div id="Container" className=" flex flex-row gap-90 justify-center items-center h-screen bg-gray-100">
      <div className="">
        <form className="ml-3.5 justify-start items-start flex flex-col gap-4 bg-white p-6 rounded shadow-md w-md" onSubmit={cargar_categoria}>
          <h1 className="text-2xl font-bold mb-6 text-center">Cargar Categorias</h1>
          <input type="text" name="nombre" id="nombre" value={formdata.nombre} onChange={handleChange} placeholder="Nombre de categoria" className="bg-white w-full border px-1 py-1.5" required />
          <textarea name="descripcion" id="descripcion" value={formdata.descripcion} onChange={handleChange} placeholder="Descripcion" className="bg-white w-full h-100 border px-2 py-1.5 scroll-auto" required></textarea>
          <input type="file" name="file" id="file" onChange={handleChange} className="bg-white w-full border" />
          <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4">Cargar</button>
        </form>
      </div>


      {/* Tabla de categorias cargadas */}

      <div className="bg-white mt-10 mb-10 p-12 rounded shadow-md max-w-[800] max-h-[600px] overflow-auto mr-3.5">
        <table className="border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-3 text-lg">Nombre</th>
              <th className="border border-black px-4 py-3 text-lg">Descripción</th>
              <th className="border border-black px-4 py-3 text-lg">Imagen</th>
              <th className="border border-black px-4 py-3 text-lg">Acciones</th>
            </tr>
          </thead>

          <tbody>

            {categorias.map((categoria) => (
              <tr>
                <td className="border border-black px-4 py-2">{categoria.NOMBRE}</td>
                <td className="border border-black px-4 py-2">{categoria.DESCRIPCION}</td>
                <td className="border border-black px-4 py-2"><img src={`data:image/jpeg;base64,${categoria.IMAGEN}`}
                  alt={categoria.NOMBRE} className="w-16 h-16 object-cover" />
                </td>
                <td className="border border-black px-4 py-2">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => ModalUpdate(categoria)}>Editar</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => ModalDelete(categoria)}>Eliminar</button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50">
            <form className="ml-3.5 justify-start items-start flex flex-col gap-4 bg-white p-6 rounded shadow-md w-md" onSubmit={cargar_categoria}>
              <h1 className="text-2xl font-bold mb-6 text-center">Editar Categoria</h1>
              <input type="text" name="nombre" id="nombre" value={editFormData.nombre} onChange={handleEditChange} placeholder="Nombre de categoria" className="bg-white w-full border px-1 py-1.5" required />
              <textarea name="descripcion" id="descripcion" value={editFormData.descripcion} onChange={handleEditChange} placeholder="Descripcion" className="bg-white w-full h-100 border px-2 py-1.5 scroll-auto" required></textarea>
              <input type="file" name="file" id="file" onChange={handleEditChange} className="bg-white w-full border" />
              <div className=" flex justify-between w-full">
                <a className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 cursor-pointer" onClick={() => setModalOpen(false)}> Cancelar</a>
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 cursor-pointer" onClick={actualizar_categoria}>Actualizar</button>
              </div>
            </form>
          </div>
        )}
      </div>
      {modalDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Eliminar Categoria <span className="text-blue-800">{formdata.nombre}</span></h2>
            <form onSubmit={eliminar_categoria}>
              <div className="flex justify-between">
                <a className="bg-gray-500 text-white py-1 px-2 rounded-md hover:bg-gray-600 cursor-pointer" onClick={CloseDeleteModal}> Cancelar</a>
                <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 cursor-pointer">Eliminar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>

  )
}

export default Cargar_Categorias;