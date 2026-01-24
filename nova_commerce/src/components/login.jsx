import { useState } from "react";


const Login = () => {
    const [Login, setLogin] = useState({
        email: "",
        password: ""
    });

    const [formRegister, setFormRegister] = useState({
        usuario: "",
        email: "",
        password: ""
    });

    const [isLogin, setIsLogin] = useState(true);


    // ============================================================ API REGISTER ============================================================

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formRegister)
            });

            if (response.ok) {
                console.log('Registro exitoso');
                setFormRegister({
                    usuario: "",
                    email: "",
                    password: ""
                });
                setIsLogin(true);
            }

        } catch (error) {
            console
        }
    }

    // ============================================================ END API REGISTER ========================================================

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {isLogin ? (
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <form onSubmit={(e) => e.preventDefault()}>

                        {/* Login */}
                        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                        {/* Correo */}
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300
                 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                        {/* Contraseña */}
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600
                 mt-4">Iniciar Sesión</button>
                        <a onClick={() => setIsLogin(false)} className="block text-center mt-2 text-blue-500 hover:underline cursor-pointer">¿No tienes cuenta?,Resgistrate</a>
                    </form>


                </div>

            ) : (
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

                    <form onSubmit={handleRegister}>
                        {/* Registro */}
                        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>

                        {/* Usuario */}
                        <label htmlFor="email">Usuario</label>
                        <input type="text" id="email" className="w-full px-4 py-2 border border-gray-300
                 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

                        {/* Correo */}
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300
                 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

                        {/* Contraseña */}
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4">Registrarse</button>
                        <a onClick={() => setIsLogin(true)} className="block text-center mt-2 text-blue-500 hover:underline cursor-pointer">¿Tienes cuenta?, Iniciar Sesión</a>
                    </form>


                </div>
            )}

        </div>
    )

}

export default Login;