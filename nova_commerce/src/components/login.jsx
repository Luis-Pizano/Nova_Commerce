import { useState } from "react";

const Login = () => {
    const [Login, setLogin] = useState({
        email: "",
        password: ""
    });

    return(
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

                {/* Correo */}
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300
                 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"value={Login.email}/>

                 {/* Contraseña */}
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-blue-500"  value={Login.password} />
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600
                 mt-4">Iniciar Sesión</button>
            </div>
        </div>
    )

}

export default Login;