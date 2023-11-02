import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import { Button } from 'primereact/button';
import '../App.css';

import axios from 'axios';

export default class Calendario extends React.Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Reservas');
      this.setState({ data: response.data._Reservas });
    } catch (error) {
      console.log(error);
    }
  }

  handleMonthView = () => {
    this.calendarRef.current.getApi().changeView('dayGridMonth');
  };

  handleWeekView = () => {
    this.calendarRef.current.getApi().changeView('timeGridWeek');
  };

  handleDayView = () => {
    this.calendarRef.current.getApi().changeView('timeGridDay');
  };



  render() {
    const { data } = this.state;

    return (
      <div className='calendario_container'>
        <div className='calendario-fondo'>
          <div className='flex justify-content-center'>
            <Button onClick={this.handleMonthView} severity='secondary' label='Mes' text/>
            <Button onClick={this.handleWeekView} severity='secondary' label='Semana' text/>
            <Button onClick={this.handleDayView} severity='secondary' label='Dia' text/>
          </div>
          <FullCalendar
            ref={this.calendarRef}
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, timeGridPlugin]}
            height='650px'
            events={data.map(reserva => ({
              title: reserva.nombre + ' - ' + reserva.salon, 
              start: reserva.fechaInicio,
              end: reserva.fechaFin, 

            }))}
            locale={esLocale}
          />

        </div>

      </div>
    )
  }
}



