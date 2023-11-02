import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
// import { Button } from 'primereact/button';

import axios from 'axios';

export default function ListaDeSalones() {

  const [data, setData] = useState([]);


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {

      const response2 = await axios.get('http://localhost:3001/Salones');
      setData(response2.data.salon);
      // console.log(response2.data.salon);


      // setData(response.data._Reservas);
    } catch (error) {
      console.log(error);
    }
  }

  // const header = (
  //   <div className="card flex justify-content-center">
  //     <Image alt="Card" src={datos.imagen} preview />
  //   </div>
  // );


  return (
    <div className="card-container">
    <div className="grid-container mt-3">
      {data.map((datos, index) => (
        <div key={index} className="card mb-3">
          <Card title={datos.salon} /* header={header} */ className="md:w-25rem">

            <div className="card-image">
              <Image alt="Card" src={datos.imagen} width="250" />
            </div>

            <h2>ubicacion: {datos.ubicacion}</h2>

            <p className="m-0">
              {datos.descripccion}
            </p>

          </Card>
        </div>
      ))}
    </div>
  </div>
  )
}