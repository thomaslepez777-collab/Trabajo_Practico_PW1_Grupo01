document.addEventListener('DOMContentLoaded', () => {

    const linksReset = document.querySelectorAll('a[href="../index.html"], a[href="Vuelos.html"]');
    linksReset.forEach(link => {
        link.addEventListener('click', () => {
            localStorage.removeItem('filtroDestino');
        });
    });
    
    const linkLogin = document.getElementById('link-login');
    const linkPerfil = document.getElementById('link-perfil');
    const linkReservas = document.getElementById('link-reservas'); 
    const linkLogout = document.getElementById('link-logout');
    const usuarioActivo = localStorage.getItem('arjet_usuario_activo');
    const estaLogueado = usuarioActivo !== null; 

    const actualizarMenu = (logueado) => {
        if (logueado) {
            if (linkLogin) linkLogin.classList.add('link-oculto');
            if (linkPerfil) linkPerfil.classList.remove('link-oculto');
            if (linkReservas) linkReservas.classList.remove('link-oculto');
            if (linkLogout) linkLogout.classList.remove('link-oculto');
        } else {
            if (linkLogin) linkLogin.classList.remove('link-oculto');
            if (linkPerfil) linkPerfil.classList.add('link-oculto');
            if (linkReservas) linkReservas.classList.add('link-oculto');
            if (linkLogout) linkLogout.classList.add('link-oculto');
        }
    };
    
    actualizarMenu(estaLogueado);

    if (linkLogout) {
        linkLogout.addEventListener('click', (e) => {
            e.preventDefault(); 
            localStorage.removeItem('arjet_usuario_activo'); 
            
            const rutaInicio = document.querySelector('nav a') ? document.querySelector('nav a').getAttribute('href') : '../index.html';
            window.location.href = rutaInicio; 
        });
    }
});

window.renderizarResumenVuelo = (idContenedor) => {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    const busqueda = JSON.parse(localStorage.getItem('busquedaVuelo')) || {};
    const precioVueloUnitario = parseFloat(localStorage.getItem('vueloSeleccionadoPrecio')) || 550;
    const cantidadPasajeros = parseInt(busqueda.pasajeros) || 1;
    const asientos = localStorage.getItem('asientosSeleccionados');
    const costoEquipaje = parseFloat(localStorage.getItem('costoEquipaje')) || 0;
    const descuento = parseFloat(localStorage.getItem('descuentoAplicado')) || 0;

    const origen = (busqueda.origen || 'EZE').toUpperCase();
    const destino = (busqueda.destino || 'MAD').toUpperCase();
    
    const precioBaseTotal = precioVueloUnitario * cantidadPasajeros;
    const subtotal = precioBaseTotal + costoEquipaje;
    const precioFinal = subtotal * (1 - descuento);

    localStorage.setItem('precioTotalFinalCalculado', precioFinal);

    let filaAsientos = asientos ? `<p><strong>Asientos:</strong> <span>${asientos}</span></p>` : '';
    let filaEquipaje = costoEquipaje > 0 ? `<p><strong>Extras Equipaje:</strong> <span>+$${costoEquipaje} USD</span></p>` : '';
    let filaDescuento = descuento > 0 ? `<p style="color: #188038;"><strong>Descuento aplicado:</strong> <span>-${descuento * 100}%</span></p>` : '';

    contenedor.innerHTML = `
        <h3>Detalle de tu Vuelo</h3>
        <p><strong>Ruta:</strong> <span>${origen} ➔ ${destino}</span></p>
        <p><strong>Pasajeros:</strong> <span>${cantidadPasajeros} Pasajero(s) x $${precioVueloUnitario} USD</span></p>
        <p><strong>Fecha de ida:</strong> <span>${busqueda.fechaIda || 'A confirmar'}</span></p>
        ${busqueda.tipoViaje === 'ida-vuelta' && busqueda.fechaRegreso ? `<p><strong>Fecha de regreso:</strong> <span>${busqueda.fechaRegreso}</span></p>` : ''}
        ${filaAsientos}
        ${filaEquipaje}
        ${filaDescuento}
        <div class="total-resumen" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed #ccc; display: flex; justify-content: space-between; font-weight: bold; font-size: 1.6rem;">
            <span>Total a Pagar:</span>
            <span class="monto-total" id="precio-total-display">$${precioFinal.toFixed(2)} USD</span>
        </div>
    `;
};