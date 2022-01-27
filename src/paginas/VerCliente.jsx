import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {

    const { id } = useParams();

    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        const obetenerCliente = async () => {

            try {

                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;

                const respuesta = await fetch(url);

                const resultado = await respuesta.json();

                setCliente(resultado);

            } catch (error) {
                console.log(error);
            }

            setCargando(!cargando);

        }
        obetenerCliente();

    }, []);


    return (

        Object.keys(cliente).length == 0 ? <p>No hay resultados</p> : (

            <div>

                {cargando ?

                    <Spinner />

                    : (
                        <>

                            <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>

                            <p className='mt-3'>Información del Cliente</p>

                            {cliente.nombre && (
                                <p className="text-4xl mt-10 text-gray-600">
                                    <span className="uppercase font-bold text-gray-800 ">Cliente: </span>
                                    {cliente.nombre}
                                </p>
                            )}

                            {cliente.email && (
                                <p className="text-2xl mt-4 text-gray-600">
                                    <span className="uppercase font-bold text-gray-800 ">Email: </span>
                                    {cliente.email}
                                </p>
                            )}


                            {cliente.telefono && (
                                <p className="text-2xl mt-4 text-gray-600">
                                    <span className="uppercase font-bold text-gray-800 ">Teléfono: </span>
                                    {cliente.telefono}
                                </p>
                            )}


                            {cliente.empresa && (
                                <p className="text-2xl mt-4 text-gray-600">
                                    <span className="uppercase font-bold text-gray-800 ">Empresa: </span>
                                    {cliente.empresa}
                                </p>
                            )}


                            {cliente.notas && (
                                <p className="text-2xl mt-4 text-gray-600">
                                    <span className="uppercase font-bold text-gray-800 ">Notas: </span>
                                    {cliente.notas}
                                </p>
                            )}

                        </>
                    )}


            </div>

        )


    )

};

export default VerCliente;
