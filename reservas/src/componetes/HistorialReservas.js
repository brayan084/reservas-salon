
import React, { useState, useEffect } from 'react';
import { Tag } from 'primereact/tag'
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button'
import { Card } from 'primereact/card';
import axios from 'axios';
const moment = require('moment');




export default function HistorialReservas() {

    const [data, setData] = useState([]);
    // console.log(data);

    const usuarioStorage = localStorage.getItem("user")
    const usuario = JSON.parse(usuarioStorage)

    const obtenerUsuario = (array, nombre) => {
        return array.filter((item) => item.nombre === nombre);
    }

    const reservasPasadas = data.filter((item) => {
        const fechaFin = moment(item.fechaFin);
        const fechaActual = moment();
        return fechaActual.isAfter(fechaFin);
    })

    const reservasFuturas = data.filter((item) => {
        const fechaInicio = moment(item.fechaInicio);
        const fechaActual = moment();
        return fechaActual.isBefore(fechaInicio);
    })

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Reservas');
            // console.log(response.data);
            const NuevaData = obtenerUsuario(response.data._Reservas, usuario.displayName);
            setData(NuevaData);

        } catch (error) {
            console.log(error);
        }
    }

    const responsiveOptions = [
        {
            breakpoint: '800px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '800px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '800px',
            numVisible: 1,
            numScroll: 1
        }
    ];

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


    const reservasFinalizadasTemplate = (data) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 mt-3 color-r ">
                <div className="mb-3">
                    <img src={data.foto} alt='' className="w-6 shadow-2" />
                </div>
                <div>
                    <h4 className="mb-1">{usuario.displayName}</h4>
                    <h3 className="mt-0 mb-3">${data.salon}</h3>
                    <h2>FECHA: {fechaInicioBodyTemplate(data)} - {fechaFinBodyTemplate(data)}</h2>
                    <h2>DESDE: {horaDesdeBodyTemplate(data)} hs. </h2>
                    <h2>HASTA: {horaHastaBodyTemplate(data)} hs. </h2>
                </div>
            </div>
        );
    };

    return (
        <div class="container">
            <h1 className='soyH1' >Historial de reservas</h1>
            <div class="carousel-container">
                <div class="carousel">
                    <div>
                        <h2 className='soyH2'>Reservas pasadas</h2>
                    </div>
                    <Carousel value={reservasPasadas} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={reservasFinalizadasTemplate} />
                </div>
                <div class="carousel">
                    <div>
                        <h2 className='soyH2'>Reservas Proximas</h2>
                    </div>
                    <Carousel value={reservasFuturas} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={reservasFinalizadasTemplate} />
                </div>
            </div>
        </div>
    )
}
