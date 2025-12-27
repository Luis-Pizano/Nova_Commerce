import { useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className={isOpen ? "w-50 h-screen bg-black text-white p-4 transform transition-width duration-300"
            : "w-12 h-screen  bg-black text-white transition-width duration-300"}>
            <div className=" absolute top-3 left-1.5 text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}><i class="fa-solid fa-bars  w-6 text-center"></i></div>
            <h2 className="text-xl font-bold p-14 flex justify-center">{isOpen && <span>Nova Commerce</span>}</h2>
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

                {/* Registro */}
                <li className="">
                    <a href="#" className="flex items-center gap-2.5 hover:text-gray-300">
                        <i className="fa-solid fa-user-plus w-6 text-center"></i>
                        {isOpen && <span>Registro</span>}
                    </a></li>

                {/* Login */}
                <li className="">

                    <a href="#" className="flex items-center gap-2.5 hover:text-gray-300">
                    <i className="fa-solid fa-door-open w-6 text-center"></i>
                    {isOpen && <span>Login</span>}</a></li>
            </ul>
            <a
                href="#"
                className="absolute bottom-5 left-1.5 py-2 px-3 hover:bg-red-800
                 rounded flex items-center gap-2.5 transition-colors">

                <i className="fa-solid fa-arrow-right-from-bracket w-6 text-center" />
                {isOpen && <span>Logout</span>}
            </a>


        </nav>
    )
}

export default Sidebar;