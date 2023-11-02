import React from 'react';
// import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Divider } from 'primereact/divider';

export default function UsuarioConfig() {

    const usuarioStorage = localStorage.getItem("user")
    const usuario = JSON.parse(usuarioStorage)
    // console.log(usuario)
    // console.log(usuario.providerData[0].phoneNumber)

    return (
        <div>

            <div className='flex justify-content-center mt-5'>
                <Image src={usuario.photoURL} alt="Image" width="175" preview />
            </div>

            <div className='card'>

                <div className=''>

                    <p className="flex justify-content-center">
                        <h2 className=''>Nombre: {usuario.displayName}</h2>
                    </p>

                    <Divider />

                    <p className="">
                        <h2 className='flex justify-content-center'>Email: {usuario.email}</h2>
                    </p>

                    <Divider />

                    <p className="">
                        <h2 className='flex justify-content-center'>ID: {usuario.providerData[0].uid}</h2>
                    </p>

                    <Divider />

                    <p className="">
                        <h2 className='flex justify-content-center'>telefono: {usuario.providerData[0].phoneNumber ? usuario.providerData[0].phoneNumber : "Sin telefono"}</h2>
                    </p>

                </div>

            </div>
        </div>
    )
}