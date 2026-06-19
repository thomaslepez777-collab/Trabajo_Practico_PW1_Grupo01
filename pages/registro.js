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

            let usuariosBD = JSON.parse(localStorage.getItem('arjet_usuarios')) || {};

            if (usuariosBD[usuario]) {
                alert("Ese nombre de usuario ya está registrado. Elegí otro.");
                return;
            }

            usuariosBD[usuario] = {
                nombre: nombre,
                nacionalidad: nacionalidad,
                dni: dni,
                telefono: telefono,
                email: email,
                password: password,
                reservas: [] 
            };

            localStorage.setItem('arjet_usuarios', JSON.stringify(usuariosBD));

            localStorage.setItem('arjet_usuario_activo', usuario);

            window.location.href = '../index.html';
        });
    }
});