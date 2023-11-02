import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useLocation } from 'react-router-dom';


export default function Navbar() {

    let location = useLocation();
    // console.log(location)



    const getActiveIndex = () => {
        return items.findIndex((item) => item.url === location.pathname);
    }

    const handleLogout = () => {
        localStorage.removeItem("firebaseToken");
        window.location.reload();
    }


    const items = [
        { label: 'Reservas', icon: 'pi pi-fw pi-file', url: '/reservas', index: 0 },
        { label: 'Salones', icon: 'pi pi-fw pi-home', url: '/salones', index: 1 },
        { label: 'Calendario', icon: 'pi pi-fw pi-calendar', url: '/calendario', index: 2 },
        { label: 'Usuario', icon: 'pi pi-fw pi-user', url: '/usuario', index: 3 },
        { label: 'Salir', icon: 'pi pi-fw pi pi-power-off', command: handleLogout }
    ];

    return (
        <div className="card">
            <TabMenu model={items} activeIndex={getActiveIndex} /* onClick={handleItemClick} */ />
        </div>
    )
}