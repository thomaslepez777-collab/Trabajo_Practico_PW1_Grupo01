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
    const busquedaGuardada = localStorage.getItem('busquedaVuelo');
    const busqueda = busquedaGuardada ? JSON.parse(busquedaGuardada) : null;
    const destinoOferta = localStorage.getItem('filtroDestino');

    if (busqueda && busqueda.pasajeros) {
        cantidadPasajerosInput.value = busqueda.pasajeros;
    }

    const vuelosDisponibles = [
    { id: 1, destino: 'Miami', aerolinea: "ArJet", precio: 800, duracion: "08:40", horarioIda: "12:00", tipo: "Directo", equipaje: true },
    { id: 2, destino: 'Roma', aerolinea: "Aerolíneas Argentinas", precio: 950, duracion: "15:30", horarioIda: "09:00", tipo: "Con escalas", equipaje: true },
    { id: 3, destino: 'Madrid', aerolinea: "Flybondi", precio: 1100, duracion: "07:30", horarioIda: "06:00", tipo: "Directo", equipaje: false },
    { id: 4, destino: 'Barcelona', aerolinea: "ArJet", precio: 1050, duracion: "12:00", horarioIda: "22:00", tipo: "Directo", equipaje: true },
    { id: 5, destino: 'Nueva York', aerolinea: "Aerolíneas Argentinas", precio: 1200, duracion: "11:00", horarioIda: "18:00", tipo: "Con escalas", equipaje: true },
    { id: 6, destino: 'Londres', aerolinea: "Flybondi", precio: 1150, duracion: "14:00", horarioIda: "14:00", tipo: "Con escalas", equipaje: false },
    { id: 7, destino: 'Miami', aerolinea: "Flybondi", precio: 750, duracion: "09:00", horarioIda: "10:00", tipo: "Con escalas", equipaje: false },
    { id: 8, destino: 'Madrid', aerolinea: "ArJet", precio: 1150, duracion: "13:00", horarioIda: "08:00", tipo: "Directo", equipaje: true }
];

    filtroPrecio.addEventListener('input', (e) => {
        valorPrecioTexto.textContent = `Hasta $${e.target.value} USD`;
    });

    function aplicarFiltros() {
        const maxPrecio = parseInt(filtroPrecio.value);
        
        const tiposSeleccionados = [];
        if (filtroDirecto.checked) tiposSeleccionados.push("Directo");
        if (filtroEscalas.checked) tiposSeleccionados.push("Con escalas");

        const aerolineasSeleccionadas = [];
        if (aeroArjet.checked) aerolineasSeleccionadas.push("ArJet");
        if (aeroAerolineas.checked) aerolineasSeleccionadas.push("Aerolíneas Argentinas");
        if (aeroFlybondi.checked) aerolineasSeleccionadas.push("Flybondi");

        const exigeEquipaje = equipajeIncluido.checked;
        
        let vuelosFiltrados = vuelosDisponibles.filter(vuelo => {
            const cumplePrecio = vuelo.precio <= maxPrecio;
            const cumpleTipo = tiposSeleccionados.includes(vuelo.tipo);
            const cumpleAerolinea = aerolineasSeleccionadas.includes(vuelo.aerolinea);
            const cumpleEquipaje = exigeEquipaje ? vuelo.equipaje === true : true;
            const cumpleOferta = destinoOferta ? vuelo.destino === destinoOferta : true;
            return cumplePrecio && cumpleTipo && cumpleAerolinea && cumpleEquipaje && cumpleOferta;
        });

        renderizarVuelos(vuelosFiltrados);
    }

    const todosLosFiltros = [
        filtroPrecio, filtroDirecto, filtroEscalas, 
        aeroArjet, aeroAerolineas, aeroFlybondi, equipajeIncluido
    ];
    
    todosLosFiltros.forEach(input => {
        input.addEventListener('change', aplicarFiltros);
    });

    function renderizarVuelos(listaVuelos) {
        contenedorVuelos.innerHTML = ''; 

        if (listaVuelos.length === 0) {
            contenedorVuelos.innerHTML = '<p class="mensaje-vacio">No se encontraron vuelos con las preferencias seleccionadas.</p>';
            return;
        }

        const origenTexto = busqueda ? busqueda.origen.toUpperCase() : 'BUE';
        const destinoTexto = busqueda ? busqueda.destino.toUpperCase() : 'MAD';

        listaVuelos.forEach(vuelo => {
            const tarjeta = document.createElement('article');
            tarjeta.classList.add('tarjeta-vuelo');
            const textoEquipaje = vuelo.equipaje ? 'Incluido' : 'Solo mochila';

            tarjeta.innerHTML = `
                <div class="info-ruta">
                    <h3>Vuelo ${vuelo.aerolinea.substring(0,2).toUpperCase()}-${vuelo.id * 1050} (${vuelo.aerolinea})</h3>
                    <p>${origenTexto} ➔ ${vuelo.destino || destinoTexto}</p>
                    <span>${vuelo.duracion} | ${vuelo.tipo} | ${textoEquipaje}</span>
                </div>
                <div class="vuelo-derecha">
                    <p class="monto">$${vuelo.precio} USD</p>
                    <a href="#" class="btn-seleccionar" data-id="${vuelo.id}" data-precio="${vuelo.precio}">Seleccionar</a>
                </div>
            `;
            contenedorVuelos.appendChild(tarjeta);
        });
        document.querySelectorAll('.btn-seleccionar').forEach(boton => {
            boton.addEventListener('click', (evento) => {
                evento.preventDefault();
                localStorage.removeItem('filtroDestino'); 
                
                const idVueloElegido = evento.target.getAttribute('data-id');
                const precioVueloElegido = parseFloat(evento.target.getAttribute('data-precio'));
                
                localStorage.setItem('vueloSeleccionadoId', idVueloElegido);
                localStorage.setItem('precioTotalReserva', precioVueloElegido * parseInt(cantidadPasajerosInput.value));
                window.location.href = 'DetalleVuelo.html';
            });
        });
    }
    
    aplicarFiltros();
});