import React from "react"

export default function Home() {
    return (
        <div>
            <header>
                <img src="imagen-salon.jpg" alt="Salón Decorado" />
            </header>
            <h1>Bienvenido a [Nombre de tu Empresa o Sitio Web]</h1>
            <p>Tu destino número uno para reservas de salones. Ya sea que estés planeando una reunión de negocios, una fiesta de cumpleaños, una boda o cualquier otro evento especial, estamos aquí para ayudarte a encontrar el lugar perfecto.</p>

            <h2>Características Destacadas</h2>
            <ul>
                <li>Amplia Selección de Salones</li>
                <li>Reservas Fáciles</li>
                <li>Personalización</li>
                <li>Precios Competitivos</li>
            </ul>

            <a href="pagina-de-reservas.html" class="boton-llamada-accion">Reservar Ahora</a>

            <h2>Cómo Funciona</h2>
            <ol>
                <li>Explora Salones</li>
                <li>Reserva en Línea</li>
                <li>Personaliza Tu Evento</li>
                <li>Disfruta</li>
            </ol>

            <h2>Testimonios de Clientes Satisfechos</h2>
            <blockquote>
                "Increíblemente fácil de usar y encontré el lugar perfecto para mi boda. ¡Recomendaré esto a todos mis amigos!" - Ana S.
            </blockquote>
            <blockquote>
                "El equipo de [Nombre de tu Empresa] hizo que mi fiesta de cumpleaños fuera inolvidable. ¡El servicio y la atención a los detalles fueron excepcionales!" - Carlos M.
            </blockquote>

            <footer>
                <div class="informacion-contacto">
                    <p>Contacto: [Tu dirección de correo electrónico]</p>
                    <p>Teléfono: [Tu número de teléfono]</p>
                </div>
                <div class="enlaces">
                    <a href="acerca-de.html">Acerca de Nosotros</a>
                    <a href="terminos-y-condiciones.html">Términos y Condiciones</a>
                </div>
            </footer>
        </div>
    )
}