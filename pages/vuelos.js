document.addEventListener('DOMContentLoaded', () => {
    const contenedorVuelos = document.querySelector('.lista-vuelos-scroll');
    const cantidadPasajerosInput = document.getElementById('cantidad-pasajeros');
    const filtroPrecio = document.getElementById('filtro-precio');
    const valorPrecioTexto = document.getElementById('valor-precio');
    const filtroDirecto = document.getElementById('filtro-directo');
    const filtroEscalas = document.getElementById('filtro-escalas');
    const aeroArjet = document.getElementById('aero-arjet');
    const aeroAerolineas = document.getElementById('aero-aerolineas');
    const aeroFlybondi = document.getElementById('aero-flybondi');
    const equipajeIncluido = document.getElementById('equipaje-incluido');
    
    const selectOrigen = document.getElementById('modificar-origen');
    const selectDestino = document.getElementById('modificar-destino');

    // Carga inicial de búsqueda
    let busqueda = JSON.parse(localStorage.getItem('busquedaVuelo')) || {};
    const destinoOferta = localStorage.getItem('filtroDestino');

    // Inicializar selectores
    if (destinoOferta && selectDestino) selectDestino.value = destinoOferta.toLowerCase();
    if (selectOrigen && busqueda.origen) selectOrigen.value = busqueda.origen.toLowerCase();
    if (selectDestino && busqueda.destino) selectDestino.value = busqueda.destino.toLowerCase();
    if (cantidadPasajerosInput && busqueda.pasajeros) cantidadPasajerosInput.value = busqueda.pasajeros;

    const vuelosDisponibles = [
        { id: 1, destino: 'Miami', aerolinea: "ArJet", precio: 800, duracion: "08:40", tipo: "Directo", equipaje: true },
        { id: 2, destino: 'Roma', aerolinea: "Aerolíneas Argentinas", precio: 950, duracion: "15:30", tipo: "Con escalas", equipaje: true },
        { id: 3, destino: 'Madrid', aerolinea: "Flybondi", precio: 1100, duracion: "07:30", tipo: "Directo", equipaje: false },
        { id: 4, destino: 'Barcelona', aerolinea: "ArJet", precio: 1050, duracion: "12:00", tipo: "Directo", equipaje: true },
        { id: 5, destino: 'Nueva York', aerolinea: "Aerolíneas Argentinas", precio: 1200, duracion: "11:00", tipo: "Con escalas", equipaje: true },
        { id: 6, destino: 'Londres', aerolinea: "Flybondi", precio: 1150, duracion: "14:00", tipo: "Con escalas", equipaje: false },
        { id: 7, destino: 'Miami', aerolinea: "Flybondi", precio: 750, duracion: "09:00", tipo: "Con escalas", equipaje: false },
        { id: 8, destino: 'Madrid', aerolinea: "ArJet", precio: 1150, duracion: "13:00", tipo: "Directo", equipaje: true }
    ];

    function actualizarRuta() {
        if (!selectOrigen || !selectDestino) return;
        let busquedaActual = JSON.parse(localStorage.getItem('busquedaVuelo')) || {};
        busquedaActual.origen = selectOrigen.value;
        busquedaActual.destino = selectDestino.value;
        if (cantidadPasajerosInput) busquedaActual.pasajeros = cantidadPasajerosInput.value;
        localStorage.setItem('busquedaVuelo', JSON.stringify(busquedaActual));
        aplicarFiltros();
    }

    [selectOrigen, selectDestino, cantidadPasajerosInput].forEach(el => {
        if (el) el.addEventListener('change', actualizarRuta);
    });

    if (filtroPrecio) {
        filtroPrecio.addEventListener('input', (e) => {
            if (valorPrecioTexto) valorPrecioTexto.textContent = `Hasta $${e.target.value} USD`;
        });
    }

    function aplicarFiltros() {
        const maxPrecio = filtroPrecio ? parseInt(filtroPrecio.value) : 9999;
        const destinos = [filtroDirecto, filtroEscalas].filter(c => c && c.checked).map(c => c.value);
        const aerolineas = [aeroArjet, aeroAerolineas, aeroFlybondi].filter(c => c && c.checked).map(c => c.value);
        const exigeEquipaje = equipajeIncluido ? equipajeIncluido.checked : false;
        const destBuscado = selectDestino ? selectDestino.value.toLowerCase() : 'todos';

        const filtrados = vuelosDisponibles.filter(v => {
            const cPrecio = v.precio <= maxPrecio;
            const cTipo = destinos.length === 0 || destinos.includes(v.tipo);
            const cAero = aerolineas.length === 0 || aerolineas.includes(v.aerolinea);
            const cEquipaje = exigeEquipaje ? v.equipaje === true : true;
            const cDestino = (destBuscado === 'todos') ? true : v.destino.toLowerCase() === destBuscado;

            return cPrecio && cTipo && cAero && cEquipaje && cDestino;
        });

        renderizarVuelos(filtrados);
    }

    function renderizarVuelos(lista) {
        contenedorVuelos.innerHTML = '';
        if (lista.length === 0) {
            contenedorVuelos.innerHTML = '<p class="mensaje-vacio">No hay vuelos para esta búsqueda.</p>';
            return;
        }

        lista.forEach(vuelo => {
            const tarjeta = document.createElement('article');
            tarjeta.classList.add('tarjeta-vuelo');
            tarjeta.innerHTML = `
                <div class="info-ruta">
                    <h3>${vuelo.aerolinea} (${vuelo.tipo})</h3>
                    <p>${selectOrigen.options[selectOrigen.selectedIndex].text} ➔ ${vuelo.destino}</p>
                    <span>${vuelo.duracion} | Equipaje: ${vuelo.equipaje ? 'Sí' : 'No'}</span>
                </div>
                <div class="vuelo-derecha">
                    <p class="monto">$${vuelo.precio} USD</p>
                    <a href="#" class="btn-seleccionar" data-id="${vuelo.id}" data-precio="${vuelo.precio}" data-destino="${vuelo.destino}">Seleccionar</a>
                </div>
            `;
            contenedorVuelos.appendChild(tarjeta);
        });

        document.querySelectorAll('.btn-seleccionar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('vueloSeleccionadoPrecio', e.target.dataset.precio);
                
                let b = JSON.parse(localStorage.getItem('busquedaVuelo')) || {};
                b.destino = e.target.dataset.destino;
                localStorage.setItem('busquedaVuelo', JSON.stringify(b));
                
                window.location.href = 'DetalleVuelo.html';
            });
        });
    }

    [filtroPrecio, filtroDirecto, filtroEscalas, aeroArjet, aeroAerolineas, aeroFlybondi, equipajeIncluido]
        .forEach(input => { if (input) input.addEventListener('change', aplicarFiltros); });

    aplicarFiltros();
});