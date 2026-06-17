document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('form-registro');

    if (formRegistro) {
        formRegistro.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const nacionalidad = document.getElementById('nacionalidad').value.trim();
            const dni = document.getElementById('dni').value.trim();
            const telefono = document.getElementById('numero').value.trim();
            const email = document.getElementById('email').value.trim();
            const usuario = document.getElementById('usuario').value.trim();
            const password = document.getElementById('password').value;

            const nuevosDatos = {
                nombre: nombre,
                nacionalidad: nacionalidad,
                dni: dni,
                telefono: telefono,
                email: email,
                usuario: usuario,
                password: password
            };

            localStorage.setItem('datosUsuario', JSON.stringify(nuevosDatos));

            localStorage.setItem('usuarioLogueado', 'true');

            window.location.href = '../index.html';
        });
    }
});