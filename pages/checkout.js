document.addEventListener('DOMContentLoaded', () => {
    const estaLogueado = localStorage.getItem('usuarioLogueado');
    if (estaLogueado !== 'true') {
        window.location.href = 'Usuario.html';
        return;
    }
    const formCheckout = document.getElementById('form-checkout');
    if (formCheckout) {
        formCheckout.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const precioFinal = localStorage.getItem('precioTotalFinal') || localStorage.getItem('precioTotalReserva') || 0;
            const asientos = localStorage.getItem('asientosSeleccionados') || 'No asignado';
            const busquedaGuardada = localStorage.getItem('busquedaVuelo');
            const busqueda = busquedaGuardada ? JSON.parse(busquedaGuardada) : {origen: 'EZE', destino: 'MAD'};
            const nuevaReserva = {
                idReserva: "AR-" + Math.floor(Math.random() * 10000) + "X",
                origen: busqueda.origen.toUpperCase(),
                destino: busqueda.destino.toUpperCase(),
                fechaIda: busqueda.fechaIda || "A confirmar",
                precioTotal: precioFinal,
                asientos: asientos,
                estado: "Pagado"
            };

            let historialReservas = JSON.parse(localStorage.getItem('historialReservas')) || [];
            historialReservas.push(nuevaReserva);
            localStorage.setItem('historialReservas', JSON.stringify(historialReservas));
            localStorage.removeItem('precioTotalFinal');
            localStorage.removeItem('asientosSeleccionados');
            window.location.href = 'MisReservas.html';
        });
    }
});