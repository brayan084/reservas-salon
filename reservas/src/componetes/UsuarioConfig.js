import React, { useEffect, useState } from 'react';
import { Image } from 'primereact/image';
import { Divider } from 'primereact/divider';
import axios from 'axios';

import { Card } from 'primereact/card';
import HistorialReservas from './HistorialReservas';

export default function UsuarioConfig() {

    const usuarioStorage = localStorage.getItem("user")
    const usuario = JSON.parse(usuarioStorage)
    // console.log(usuario)
    // console.log(usuario.providerData[0].phoneNumber)

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Reservas');
            // console.log(response.data);
            setData(response.data._Reservas);

        } catch (error) {
            console.log(error);
        }
    }

    const fechaInicioBodyTemplate = (rowData) => {
        const fecha = new Date(rowData.fechaInicio);
        const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString(undefined, opciones);

        return <span>{fechaFormateada}</span>;
    };
    const fechaFinBodyTemplate = (rowData) => {
        const fecha = new Date(rowData.fechaFin);
        const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString(undefined, opciones);

        return <span>{fechaFormateada}</span>;
    };


    const horaDesdeBodyTemplate = (rowData) => {
        const fecha = new Date(rowData.fechaInicio);
        // console.log(fecha);
        const opciones = { hour: 'numeric', minute: 'numeric', hour24: true };
        const horaFormateada = fecha.toLocaleTimeString(undefined, opciones);

        return <span>{horaFormateada}</span>;
    };

    const defaultHora = new Date();
    defaultHora.setHours(12, 0);

    const horaHastaBodyTemplate = (rowData) => {
        const fecha = new Date(rowData.fechaFin);
        // console.log(fecha);
        const opciones = { hour: 'numeric', minute: 'numeric', hour24: true };
        const horaFormateada = fecha.toLocaleTimeString(undefined, opciones);

        return <span>{horaFormateada}</span>;
    };


    return (
        <div className='grid-container-user'>
            <div className='User_details'>

                <div className='card User_container'>

                    <div className='User_image'>
                        <Image src={usuario.photoURL} alt="Image" width="155" preview />
                    </div>
                    <Divider />
                    <p className="">
                        <h2 className=''>Nombre: {usuario.displayName}</h2>
                    </p>
                    <Divider />
                    <p className="">
                        <h2 className=''>Email: {usuario.email}</h2>
                    </p>
                    <Divider />
                    <p className="">
                        <h2 className=''>ID: {usuario.providerData[0].uid}</h2>
                    </p>
                    <Divider />
                    <p className="">
                        <h2 className=''>telefono: {usuario.providerData[0].phoneNumber ? usuario.providerData[0].phoneNumber : "Sin telefono"}</h2>
                    </p>

                </div>
            </div>
            <div >
                <HistorialReservas />
            </div>




        </div>
    )
}