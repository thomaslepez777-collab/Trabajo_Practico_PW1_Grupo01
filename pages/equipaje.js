document.addEventListener('DOMContentLoaded', () => {
    const formEquipaje = document.querySelector('.formulario-equipaje');
    const textoPrecioTotal = document.getElementById('precio-total-equipaje');

    const precioBaseReserva = parseFloat(localStorage.getItem('precioTotalReserva')) || 0;
    let precioFinal = precioBaseReserva;

    const preciosExtra = {
        '9kg': 0,
        '12kg': 20,
        '20kg': 50,
        'mano': 0,
        'especial': 30,
        'manoespecial': 40,
        'mascota': 60
    };

    function calcularTotal() {
        let costoAdicional = 0;

        const pesoSeleccionado = document.querySelector('input[name="peso"]:checked');
        if (pesoSeleccionado) {
            costoAdicional += preciosExtra[pesoSeleccionado.value] || 0;
        }

        const tipoExtraSeleccionado = document.querySelector('input[name="tipo_extra"]:checked');
        if (tipoExtraSeleccionado) {
            costoAdicional += preciosExtra[tipoExtraSeleccionado.value] || 0;
        }

        const mascotaSeleccionada = document.getElementById('equipajemascota');
        if (mascotaSeleccionada && mascotaSeleccionada.checked) {
            costoAdicional += preciosExtra['mascota'] || 0;
        }

        precioFinal = precioBaseReserva + costoAdicional;

        if (textoPrecioTotal) {
            textoPrecioTotal.textContent = `$${precioFinal} USD`;
        }
    }

    calcularTotal();

    const todosLosInputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    todosLosInputs.forEach(input => {
        input.addEventListener('change', calcularTotal);
    });

    if (formEquipaje) {
        formEquipaje.addEventListener('submit', (evento) => {
            evento.preventDefault();
            
            localStorage.setItem('precioTotalFinal', precioFinal);
            const estaLogueado = localStorage.getItem('usuarioLogueado');

            if (estaLogueado === 'true') {
                window.location.href = 'Checkout.html';
            } else {
                localStorage.setItem('redireccionPostLogin', 'Checkout.html');
                localStorage.setItem('mostrarAvisoLogin', 'true');
                window.location.href = 'Usuario.html';
            }
        });
    }
});