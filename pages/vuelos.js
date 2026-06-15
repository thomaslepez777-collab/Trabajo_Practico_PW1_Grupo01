document.addEventListener('DOMContentLoaded', () => {
    const contenedorVuelos = document.querySelector('.lista-vuelos-scroll');
    
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

    const vuelosDisponibles = [
        { id: 1, aerolinea: "ArJet", precio: 540, duracion: "08:40", horarioIda: "12:00", tipo: "Directo", equipaje: true },
        { id: 2, aerolinea: "Flybondi", precio: 450, duracion: "03:15", horarioIda: "15:30", tipo: "Directo", equipaje: false },
        { id: 3, aerolinea: "Aerolíneas Argentinas", precio: 950, duracion: "15:30", horarioIda: "09:00", tipo: "Con escalas", equipaje: true },
        { id: 4, aerolinea: "ArJet", precio: 1200, duracion: "12:00", horarioIda: "22:00", tipo: "Directo", equipaje: true },
        { id: 5, aerolinea: "Flybondi", precio: 600, duracion: "07:30", horarioIda: "06:00", tipo: "Con escalas", equipaje: false }
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
        const vuelosFiltrados = vuelosDisponibles.filter(vuelo => {
            const cumplePrecio = vuelo.precio <= maxPrecio;
            const cumpleTipo = tiposSeleccionados.includes(vuelo.tipo);
            const cumpleAerolinea = aerolineasSeleccionadas.includes(vuelo.aerolinea);
            const cumpleEquipaje = exigeEquipaje ? vuelo.equipaje === true : true;
            return cumplePrecio && cumpleTipo && cumpleAerolinea && cumpleEquipaje;
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
            contenedorVuelos.innerHTML = '<p style="text-align:center; font-size:1.8rem; margin-top:2rem; color:#1a3a4a;">No se encontraron vuelos con las preferencias seleccionadas.</p>';
            return;
        }

        const origenTexto = busqueda ? busqueda.origen.toUpperCase() : 'EZE';
        const destinoTexto = busqueda ? busqueda.destino.toUpperCase() : 'MAD';

        listaVuelos.forEach(vuelo => {
            const tarjeta = document.createElement('article');
            tarjeta.classList.add('tarjeta-vuelo');
            
            const textoEquipaje = vuelo.equipaje ? 'Incluido' : 'Solo mochila';

            tarjeta.innerHTML = `
                <div class="info-ruta">
                    <h3>Vuelo ${vuelo.aerolinea.substring(0,2).toUpperCase()}-${vuelo.id * 1050} (${vuelo.aerolinea})</h3>
                    <p>${origenTexto} ➔ ${destinoTexto}</p>
                    <span>${vuelo.duracion} | ${vuelo.tipo} | ${textoEquipaje}</span>
                </div>
                <div style="text-align:right;">
                    <p class="monto">$${vuelo.precio} USD</p>
                    <a href="#" class="btn-seleccionar" data-id="${vuelo.id}" data-precio="${vuelo.precio}">Seleccionar</a>
                </div>
            `;
            
            contenedorVuelos.appendChild(tarjeta);
        });

        const botonesSeleccionar = document.querySelectorAll('.btn-seleccionar');
        botonesSeleccionar.forEach(boton => {
            boton.addEventListener('click', (evento) => {
                evento.preventDefault();
                const idVueloElegido = evento.target.getAttribute('data-id');
                const precioVueloElegido = evento.target.getAttribute('data-precio');
                
                localStorage.setItem('vueloSeleccionadoId', idVueloElegido);
                localStorage.setItem('vueloSeleccionadoPrecio', precioVueloElegido);
                
                window.location.href = 'DetalleVuelo.html';
            });
        });
    }
    aplicarFiltros();
});