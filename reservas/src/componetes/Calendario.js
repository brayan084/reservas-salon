import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import axios from 'axios';

export default function Calendario() {

  const [data, setData] = useState([]);

  console.log(data)
  // console.log(data[0].fechaInicio)
  // console.log(data[0].fechaFin)

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Reservas');
      // console.log(response.data);
      setData(response.data._Reservas);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='calendario_container'>
      <div className='calendario-fondo'>

        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height="600px"
          events={data.map(reserva => ({
            title: reserva.nombre + ' - ' + reserva.salon , // Reemplaza "reserva.titulo" con la propiedad de tus reservas que representa el título del evento
            start: reserva.fechaInicio.split('T')[0], // Reemplaza "reserva.fechaInicio" con la propiedad de tus reservas que representa la fecha de inicio del evento
            end: reserva.fechaFin.split('T')[0], // Agrega esta línea y reemplaza "reserva.fechaFin" con la propiedad de tus reservas que representa la fecha de finalización del evento

          }))}
        />
      </div>
    </div>
  )
}