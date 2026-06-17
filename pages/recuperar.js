document.addEventListener('DOMContentLoaded', () => {
    const formRecuperar = document.getElementById('form-recuperar');
    const mensajeTexto = document.getElementById('mensaje-recuperacion');

    if (formRecuperar) {
        formRecuperar.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const email = document.getElementById('email-recuperacion').value.trim();

            mensajeTexto.classList.remove('oculto');
            mensajeTexto.textContent = `¡Listo! Si el correo ${email} está registrado en ArJet, vas a recibir un enlace para crear una nueva contraseña en los próximos minutos.`;
            formRecuperar.reset();
        });
    }
});