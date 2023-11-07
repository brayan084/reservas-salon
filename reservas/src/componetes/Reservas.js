import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';


import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
// import { Tooltip } from 'primereact/tooltip';

// import { SplitButton } from 'primereact/splitbutton';
//import { useRouter } from 'next/router';



// import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';



export default function Reservas() {

    const usuarioStorage = localStorage.getItem("user")
    const usuario = JSON.parse(usuarioStorage)
    // console.log(usuario.photoURL)


    let newReserva = {
        id: null,
        nombre: usuario.displayName ? usuario.displayName : 'fulanito',
        foto: usuario.photoURL ?? 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png',
        salon: '',
        email: usuario.email,
        fechaInicio: Date,
        fechaFin: Date
    }


    // Datos traidos del backend
    const [salon, setSalon] = useState([]);
    const [data, setData] = useState([]);
    // console.log(data)
    const toastRight = useRef(null);
    const toast = useRef(null);
    const [deleteReservaDialog, setDeleteReservaDialog] = useState(false);
    const [reservaId, setReservaId] = useState(null);

    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroSalon, setFiltroSalon] = useState('');
    const [filtroFechaInicio, setFiltroFechaInicio] = useState(null);
    // console.log(filtroFechaInicio)
    const [filtroFechaFin, setFiltroFechaFin] = useState(null);



    const [inputDialog, setDialog] = useState(false);
    const [nuevaReserva, setNuevaReserva] = useState(newReserva);



    useEffect(() => {
        getData();
        getSalones();
    }, []);

    const getSalones = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Salones');
            // console.log(response.data);
            setSalon(response.data.salon);

        } catch (error) {
            console.log(error);
        }
    }

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Reservas');
            // console.log(response.data);
            setData(response.data._Reservas);

        } catch (error) {
            console.log(error);
        }
    }


    const addData = async () => {
        try {
            // validaciones

            if (nuevaReserva.salon === '') {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Seleccione un salon', life: 3000 });
                return
            }
            if (nuevaReserva.fechaInicio === Date) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Seleccione una fecha de inicio', life: 3000 });
                return
            }
            if (nuevaReserva.fechaFin === Date) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Seleccione una fecha de fin', life: 3000 });
                return
            }

            // Si no tiene id, hay que crear una nueva reserva

            if (!nuevaReserva.id) {
                
                try {
    
                    await axios.post('http://localhost:3001/Reservas', nuevaReserva);
    
                    hideDialog();
                    setNuevaReserva(newReserva);
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Reserva Creada', life: 2000 });
    
                } catch (error) {
                    const message = error.response.data.msg;
                    if (error.response.status === 500) {
                        toastRight.current.show([
                            { severity: 'error', summary: 'Error', detail: message, life: 3000 },
                            { severity: 'warn', summary: 'Error', detail: 'Cambie la fecha de inicio o de fin del evento o cambie el salón', life: 3000 },
                        ])
    
                    }
                }
            }


            // Si tiene id, significa que hay que editar

            if (nuevaReserva.id) {

                try {

                    await axios.put(`http://localhost:3001/Reservas/${nuevaReserva.id}`, nuevaReserva);

                    hideDialog();
                    setNuevaReserva(newReserva);
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Reserva Editada', life: 2000 });

                } catch (error) {
                    console.log(error);
                }
            }

            getData();

        } catch (error) {
            console.log(error);
        }
    }

    const EliminarReserva = async () => {

        const id = reservaId;
        try {
            await axios.delete(`http://localhost:3001/Reservas/${id}`);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Reserva eliminada', life: 2000 });

            hideDeleteReservaDialog();
            getData();
        } catch (error) {
            console.log(error);
        }
    }

    const EditarReserva = async (id) => {

        try {
            const response = await axios.get(`http://localhost:3001/Reservas/${id}`);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Reserva editada', life: 2000 });
            // console.log(response.data.fechaInicio);

            const _fechaInicio = new Date(response.data.fechaInicio);
            const _fechaFin = new Date(response.data.fechaFin);

            setNuevaReserva({ ...response.data, fechaInicio: _fechaInicio, fechaFin: _fechaFin });

        } catch (error) {
            console.log(error);
        }
    }


    const hideDialog = () => {
        setDialog(false);
        setNuevaReserva(newReserva);
    }

    const hideDeleteReservaDialog = () => {
        setDeleteReservaDialog(false);
    };

    // const handleButtonEditar = (id) => {
    //     EditarReserva(id)
    //     setDialog(true)
    // }


    const onInputChange = (event) => {
        const val = event.value;
        // console.log(val);
        if (!val == '') {

            setNuevaReserva(prevPedido => ({
                ...prevPedido,
                salon: val,
            }))
        } else {
            console.log('no hay nada')
        }  
    };

    const handleChangeFechaInicio = (event) => {
        const newFecha = event.value; // Obtener la nueva fecha seleccionada del evento
        // console.log(newFecha);
        setNuevaReserva(prevPedido => ({
            ...prevPedido,
            fechaInicio: newFecha,
        }));
    };

    const handleChangeFechaFin = (event) => {
        const newFecha = event.value; // Obtener la nueva fecha seleccionada del evento
        // console.log(newFecha);
        setNuevaReserva(prevPedido => ({
            ...prevPedido,
            fechaFin: newFecha,
        }));
    };

    const handleChangeFiltroNombre = (event) => {
        setFiltroNombre(event.target.value);
    };

    const handleChangeFiltroSalon = (event) => {
        setFiltroSalon(event.target.value);
    }

    const handleChangeFiltroFechaInicio = (event) => {
        setFiltroFechaInicio(event.target.value);
    }
    const handleChangeFiltroFechaFin = (event) => {
        setFiltroFechaFin(event.target.value);
    }

    const handleLimpiarFiltros = () => {
        setFiltroFechaInicio(null);
        setFiltroFechaFin(null);
        setFiltroNombre('');
        setFiltroSalon('');
    };

    const filtroPorFecha = (datos) => {

        if (!filtroFechaInicio || !filtroFechaFin) return true; // Si no se ha seleccionado un rango, mostrar todas las tarjetas

        const fechaInicioDate = new Date(filtroFechaInicio);
        const fechaFinDate = new Date(filtroFechaFin);
        const tarjetaFechaInicio = new Date(datos.fechaInicio);
        // const tarjetaFechaFin = new Date(datos.fechaFin);

        // Verificar si la fecha de inicio de la tarjeta está dentro del rango seleccionado
        const dentroDelRango = tarjetaFechaInicio >= fechaInicioDate && tarjetaFechaInicio <= fechaFinDate;

        return dentroDelRango;
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

    const footerDialog = (
        <React.Fragment>
            <div>
                <Button label='Cancelar' onClick={hideDialog} icon='pi pi-times' severity='danger' />
                <Button label='Guardar' onClick={addData} icon='pi pi-check' severity='success' type='submit' />
            </div>
        </React.Fragment>
    )

    const deleteReservaDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteReservaDialog} />
            <Button label="Si" icon="pi pi-check" severity="danger" onClick={EliminarReserva} />
        </React.Fragment>
    );

    const startContent = (
        <React.Fragment>
            <div className='start-content'>
                {/* <h2>Filtros</h2> */}
                <div className='mr-3'>
                    <span className='p-float-label'>
                        <InputText type="text " placeholder="Filtrar por nombre" value={filtroNombre} onChange={handleChangeFiltroNombre} className='p-inputtext-sm' />
                        <label htmlFor="dd-city">Filtrar por Nombre</label>
                    </span>
                </div>
                <div className='mr-3'>
                    <span className="p-float-label">
                        <Dropdown
                            value={filtroSalon}
                            onChange={handleChangeFiltroSalon}
                            options={salon}
                            optionLabel='salon'
                            optionValue='salon'
                            placeholder="filtrar por salon"
                            showClear={true}
                            className='p-inputtext-sm'
                        />
                        <label htmlFor="dd-city">Filtrar por salon</label>
                    </span>
                </div>

                <div className='mr-3'>
                    <label htmlFor="fechaInicio">Fecha de inicio: </label>
                    <Calendar id="fechaInicio" dateFormat='dd/mm/yy' value={filtroFechaInicio} onChange={handleChangeFiltroFechaInicio} className='p-inputtext-sm' />
                </div>
                <div className='mr-3'>
                    <label htmlFor="fechaFin">Fecha de fin: </label>
                    <Calendar id="fechaFin" dateFormat='dd/mm/yy' value={filtroFechaFin} onChange={handleChangeFiltroFechaFin} className='p-inputtext-sm' />
                </div>

            </div>
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <div>
                <Button label='Limpiar Filtros' onClick={handleLimpiarFiltros} icon='pi pi-filter-slash' />
            </div>
        </React.Fragment>
    )


    // ----------------------------------------------------------------------------------------------------------------------------------------------------------

    return (
        <div className="">
            <Toast ref={toast} position='top-center' />
            <Toast ref={toastRight} position='top-right' />


            <div className="Toolbar" >

                <Toolbar start={startContent} end={endContent} />
            </div>

            <div className="flex justify-content-center titulo">
                <h2>Reservas</h2>
            </div>


            <div className="card flex justify-content-center mb-3">
                <div className="grid-container2 mt-3">


                    {data
                        .filter((datos) => datos.nombre.includes(filtroNombre))
                        .filter((datos) => datos.salon.includes(filtroSalon))
                        .filter((datos) => filtroPorFecha(datos))
                        .map((datos, index) => (
                            <div key={index} className="card ">
                                <Card className="md:w-22rem md:h-20rem grid-container3 ">
                                    <div className="card-content">
                                        <div className="card-image">
                                            <img alt="Foto del usuario" src={datos.foto} />
                                        </div>
                                        <div className='card-body'>
                                            <h2>NOMBRE: {datos.nombre}</h2>
                                            <h2>SALON: {datos.salon}</h2>
                                            <h2>FECHA: {fechaInicioBodyTemplate(datos)} - {fechaFinBodyTemplate(datos)}</h2>
                                            <h2>DESDE: {horaDesdeBodyTemplate(datos)} hs. </h2>
                                            <h2>HASTA: {horaHastaBodyTemplate(datos)} hs. </h2>
                                        </div>
                                    </div>
                                    <div className='flex justify-content-end'>
                                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => (EditarReserva(datos.id), setDialog(true))} tooltip="Editar Reserva" tooltipOptions={{ position: 'top' }} />
                                        <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={() => (setReservaId(datos.id), setDeleteReservaDialog(true))} tooltip="Eliminar Reserva" tooltipOptions={{ position: 'top' }} />
                                    </div>
                                </Card>
                            </div>
                        ))
                    }

                    <div className="md:w-22rem md:h-20rem grid-container3">
                        <Button
                            icon="pi pi-plus"
                            className="nueva-reserva-button md:w-26rem grid-container3"
                            onClick={() => setDialog(true)}
                            tooltip="Crear nueva reserva"
                            tooltipOptions={{ position: 'top' }}
                        />
                    </div>
                </div>


            </div>


            <div>
                <Dialog visible={inputDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" footer={footerDialog} header="Nueva Reserva" onHide={hideDialog}>

                    <form onSubmit={addData} >

                        <div className="flex-auto mb-5">
                            <label className="font-bold block mb-2">
                                Elige un salon:
                            </label>
                            <Dropdown
                                value={nuevaReserva.salon}
                                onChange={onInputChange}
                                options={salon}
                                optionLabel='salon'
                                optionValue='salon'
                                placeholder="Select a salon"
                                className="w-full md:w-rem"
                                required
                            />
                        </div>

                        <div className="flex-auto mb-5">
                            <label htmlFor="calendar-timeonly" className="font-bold block mb-2">
                                Elige una fecha y hora de inicio:
                            </label>
                            <Calendar id="calendar-timeonly" dateFormat='dd/mm/yy' type="datetime" value={nuevaReserva.fechaInicio} onChange={handleChangeFechaInicio} showTime />
                        </div>

                        <div className="flex-auto ">
                            <label htmlFor="calendar-timeonly" className="font-bold block mb-2">
                                Elige una fecha y hora de fin:
                            </label>
                            <Calendar id="calendar-timeonly" dateFormat='dd/mm/yy' type="datetime" value={nuevaReserva.fechaFin} onChange={handleChangeFechaFin} showTime />
                        </div>

                    </form>
                </Dialog>
            </div>

            <div>
                <Dialog visible={deleteReservaDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteReservaDialogFooter} onHide={hideDeleteReservaDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {nuevaReserva && (
                            <span>
                                Estas seguro que desea eliminar esta reserva?
                            </span>
                        )}
                    </div>
                </Dialog>
            </div>

        </div>
    )
}



