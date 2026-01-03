import { useState,useEffect } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAdministration, setIsOpenAdministration] = useState(false);

    useEffect(() => {
    if (!isOpen) setIsOpenAdministration(false);
}, [isOpen]);


    return (
        <nav className={isOpen ? "w-50 h-screen bg-black text-white p-4 transform transition-width duration-300"
            : "w-12 h-screen  bg-black text-white transition-width duration-300"}>
            <div className=" absolute top-3 left-1.5 text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}><i class="fa-solid fa-bars  w-6 text-center"></i></div>
            <h2 className="text-xl font-bold p-14 flex justify-center">{isOpen && <a href="/">Nova Commerce</a>}</h2>
            <ul className="space-y-8">
                {/* Productos */}
                <li className="">
                    <a href="#" className="flex items-center gap-2.5 hover:text-gray-300">
                        <i className="fa-solid fa-box w-6 text-center text-lg"></i>
                        {isOpen && <span>Productos</span>}</a></li>

                {/* Pedidos */}
                <li className="">
                    <a href="#" className="flex items-center gap-2.5 hover:text-gray-300">
                        <i className="fa-solid fa-clipboard-list w-6 text-center text-lg"></i>
                        {isOpen && <span>Pedidos</span>}</a></li>

                {/* Carrito */}
                <li className="">
                    <a href="#" className="flex items-center gap-2.5 hover:text-gray-300">
                         <i className="fa-solid fa-cart-shopping w-6 text-center text-lg"></i>
                        {isOpen && <span>Carrito</span>}</a></li>

                {/* Presentación de marcas con las que se trabajan*/}
                <li className="">
                    <a href="#" className="flex items-center gap-2.5 hover:text-gray-300">
                        <i className="fa-solid fa-tags w-6 text-center text-lg"></i>
                        {isOpen && <span>Nuestras Marcas</span>}</a></li>

                {/* Registro y Login */}
                <li className="">
                    <a href="/login-or-register" className="flex items-center gap-2.5 hover:text-gray-300">
                        <i className="fa-solid fa-user-plus w-6 text-center"></i>
                        {isOpen && <span>Acceder</span>}
                    </a></li>

                {/* Cargar Categorias */}
                <li className="">
                    <a href="#" className="flex items-center gap-2.5 hover:text-gray-300">
                        <i className="fa-solid fa-plus w-6 text-center"></i>
                        {isOpen && <span>Categoria</span>}
                    </a></li>


                {/* Administración con submenú */}
                <li className="relative">

                    <button onClick={() => setIsOpenAdministration(!isOpenAdministration)} className="flex items-center gap-2.5 hover:text-gray-300">
                    <i className="fa-solid fa-gear w-6 text-center" title="Administración"></i>
                    {isOpen && <span>Administración</span>}</button>
                    {isOpenAdministration && isOpen && (
                        <ul className=" absolute mt-2 ml-8 bottom-full space-y-4 bg-gray-700 p-4 rounded shadow-lg z-20 max-h-[500px] overflow-y-auto">
                            <li><a href="#"  className="flex items-center gap-2.5 hover:text-gray-300">
                                {isOpen && <span>Agregar Productos</span>} </a>
                            </li>
                            <li><a href="#"  className="flex items-center gap-2.5 hover:text-gray-300">
                                {isOpen && <span>Agregar Productos</span>} </a>
                            </li>

                        </ul>
                    )}
                    
                </li>
            </ul>
            <a
                href="#"
                className="absolute bottom-5 left-1.5 py-2 px-3 hover:bg-red-800
                 rounded flex items-center gap-2.5 transition-colors">

                <i className="fa-solid fa-arrow-right-from-bracket w-6 text-center" title="Logout"/>
                {isOpen && <span>Logout</span>}
            </a>


        </nav>
    )
}

export default Sidebar;