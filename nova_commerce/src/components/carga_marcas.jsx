import { useState, useEffect } from "react";

const Marcas = () => {
    const [formdata, setFormdata] = useState({
        nombre: ""
    });

    const [marcas, setMarcas] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata({
            ...formdata,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/cargar_marcas',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formdata)
            })
            if (response.ok) {
                console.log('Marca cargada exitosamente');
                setFormdata({
                    nombre: ""
                });
            }

        } catch (error) {
            console.error(`Error al cargar marca, Error: ${error}`);
        }
    };

    useEffect(() => {
        const fetchMarcas = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/obtener_marcas');
            const data = await response.json();
            if (response.ok) {
                setMarcas(data);
            }
        } catch (error) {
            console.error(`Error al obtener marcas, Error: ${error}`);
        }
    };
    fetchMarcas();
    }, []);

    const Modal = () => setModalOpen(!modalOpen);

    return (
        // Carga de Marcas
        <div id="container" className="flex flex-row gap-90 justify-center items-start h-screen bg-gray-100">
            <section className=" flex mt-50 mr-60 bg-white p-5 shadow-2xl rounded-lg w-md ">
                <form onSubmit={handleSubmit}>
                    <h1 className="flex justify-center items-center mb-4 text-xl">Cargar Marca</h1>
                    <label htmlFor="nombre" className="block mb-3">Nombre de la marca</label>
                    <input type="text" name="nombre" id="nombre" placeholder="Nombre de la marca" className="w-full px-4 py-2 border border-gray-300" value={formdata.nombre} onChange={handleChange} required />
                    <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4">Cargar Marca</button>
                </form>
            </section>

            {/* Listado de marcas cargadas */}
            <section className=" relative bg-white flex p-4 rounded shadow-md max-w-[400px] max-h-[600px] overflow-auto top-4.5" >
                <table className="border-collapse border border-black ">
                    <thead>
                        <tr>
                            <th className="border border-black px-4 py-3 text-lg">Nombre</th>
                            <th className="border border-black px-4 py-3 text-lg">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marcas.map((marca) => (
                            <tr>
                                <td className="border border-black px-4 py-3">{marca.NOMBRE}</td>
                                <td className="border border-black px-4 py-3">
                                    <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 mr-2" onClick={Modal}>Editar</button>
                                    <button className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">Editar Marca</h2>
                        <form>
                            <label htmlFor="editNombre" className="block mb-2">Nombre de la marca</label>
                            <input type="text" id="editNombre" className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4" placeholder="Nombre de la marca" />
                            <div className="flex justify-between">
                                <a className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600" onClick={Modal}> Cancelar</a>
                                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}
export default Marcas;