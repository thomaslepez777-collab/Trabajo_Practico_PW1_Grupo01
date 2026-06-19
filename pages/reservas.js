document.addEventListener('DOMContentLoaded', () => {
    const contenedorReservas = document.getElementById('contenedor-reservas');

    function cargarReservas() {
        const usuarioActivo = localStorage.getItem('arjet_usuario_activo');
        
        // Si no hay nadie logueado, no mostramos nada
        if (!usuarioActivo) {
            if(contenedorReservas) contenedorReservas.innerHTML = '<p class="mensaje-vacio">Iniciá sesión para ver tus reservas.</p>';
            return;
        }

        let usuariosBD = JSON.parse(localStorage.getItem('arjet_usuarios')) || {};
        
        // Traemos únicamente las reservas de este usuario
        const misReservas = usuariosBD[usuarioActivo].reservas || [];
        
        if(contenedorReservas) contenedorReservas.innerHTML = '';

        if (misReservas.length === 0) {
            contenedorReservas.innerHTML = '<p class="mensaje-vacio">No tenés reservas activas en este momento.</p>';
            return;
        }

        misReservas.forEach(reserva => {
            const detalleReserva = document.createElement('details');
            detalleReserva.classList.add('item-reserva');

            const checkinListo = reserva.checkin === true;
            const estadoClase = checkinListo ? 'estado-listo' : 'estado-pendiente';
            const estadoTexto = checkinListo ? 'Check-in Realizado' : (reserva.estado || 'Confirmado');
            let bloqueAccion = '';
            
            if (checkinListo) {
                bloqueAccion = `
                    <div class="ticket-boarding">
                        <div class="ticket-info">
                            <h4> Boarding Pass</h4>
                            <p><strong>Pasajeros:</strong> ${reserva.pasajeros || 'No especificado'}</p>
                            <p><strong>Asientos:</strong> ${reserva.asientos}</p>
                            <p><strong>Puerta:</strong> A14 (Estimada)</p>
                        </div>
                       <div class="ticket-qr-box">
                            <svg viewBox="0 0 100 100" class="qr-svg">
                                <rect width="100" height="100" rx="5" class="qr-fondo"/>
                                <path d="M10,10 h25 v25 h-25 z M15,15 h15 v15 h-15 z M65,10 h25 v25 h-25 z M70,15 h15 v15 h-15 z M10,65 h25 v25 h-25 z M15,70 h15 v15 h-15 z M45,45 h10 v10 h-10 z M60,60 h10 v10 h-10 z M80,80 h10 v10 h-10 z M40,15 h15 v5 h-15 z M15,45 h20 v5 h-20 z M45,75 h15 v5 h-15 z M75,45 h15 v15 h-15 z M50,60 h5 v5 h-5 z" class="qr-tinta"/>
                            </svg>
                            <p class="qr-texto">Listo para embarcar</p>
                        </div>
                    </div>
                `;
            } else {
                bloqueAccion = `
                    <div class="accion-reserva">
                        <p class="aviso-checkin">Tu vuelo está confirmado. Recordá hacer el check-in entre 48hs y 2hs antes de salir.</p>
                        <button type="button" class="btn-checkin" data-id="${reserva.idReserva}">Realizar Check-in</button>
                    </div>
                `;
            }

            detalleReserva.innerHTML = `
                <summary>
                    <span> ${reserva.origen} ➔ ${reserva.destino}</span>
                    <span>$${reserva.precioTotal} USD</span>
                </summary>
                <div class="contenido-reserva">
                    <div class="resumen-flex">
                        <div>
                            <p><strong>Fecha Ida:</strong> ${reserva.fechaIda || 'A confirmar'}</p>
                            <p><strong>Código:</strong> ${reserva.idReserva}</p>
                        </div>
                        <div class="resumen-derecha">
                            <p><strong>Estado:</strong> <span class="${estadoClase}">${estadoTexto}</span></p>
                        </div>
                    </div>
                    <hr class="separador-reserva">
                    ${bloqueAccion}
                </div>
            `;
            
            contenedorReservas.appendChild(detalleReserva);
        });
    }

    cargarReservas();

    if(contenedorReservas) {
        contenedorReservas.addEventListener('click', (evento) => {
            if (evento.target.classList.contains('btn-checkin')) {
                const idReserva = evento.target.getAttribute('data-id');
                const usuarioActivo = localStorage.getItem('arjet_usuario_activo');
                let usuariosBD = JSON.parse(localStorage.getItem('arjet_usuarios'));

                // Buscamos la reserva adentro de las reservas del usuario activo
                const indice = usuariosBD[usuarioActivo].reservas.findIndex(r => r.idReserva === idReserva);
                
                if (indice !== -1) {
                    // Actualizamos el estado del checkin
                    usuariosBD[usuarioActivo].reservas[indice].checkin = true;
                    // Guardamos la BD entera de vuelta
                    localStorage.setItem('arjet_usuarios', JSON.stringify(usuariosBD));
                    
                    cargarReservas();
                }
            }
        });
    }
});