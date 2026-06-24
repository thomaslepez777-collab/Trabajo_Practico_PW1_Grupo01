document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('form-registro');

    if (formRegistro) {
        formRegistro.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const nacionalidad = document.getElementById('nacionalidad').value.trim();
            const dni = document.getElementById('dni').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const email = document.getElementById('email').value.trim();
            const usuario = document.getElementById('usuario').value.trim();
            const password = document.getElementById('password').value;
            let usuariosBD = JSON.parse(localStorage.getItem('arjet_usuarios')) || {};

            // --- NUEVO: ELEMENTOS DE LA CONTRASEÑA ---
    const inputPassword = document.getElementById('password');
    const togglePassword = document.getElementById('toggle-password');
    const reqLargo = document.getElementById('req-largo');
    const reqMayus = document.getElementById('req-mayus');
    const reqMinus = document.getElementById('req-minus');
    const reqNum = document.getElementById('req-num');

    if (inputPassword) {
        togglePassword.addEventListener('click', function () {
            const tipo = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            inputPassword.setAttribute('type', tipo);
            this.classList.toggle('bx-show');
            this.classList.toggle('bx-hide');
        });

        inputPassword.addEventListener('input', () => {
            const valor = inputPassword.value;
            actualizarRequisito(reqLargo, valor.length >= 8);
            actualizarRequisito(reqMayus, /[A-Z]/.test(valor));
            actualizarRequisito(reqMinus, /[a-z]/.test(valor));
            actualizarRequisito(reqNum, /[0-9]/.test(valor));
        });
    }

    function actualizarRequisito(elemento, esValido) {
        const icono = elemento.querySelector('i');
        if (esValido) {
            elemento.classList.remove('invalido');
            elemento.classList.add('valido');
            icono.classList.remove('bx-x');
            icono.classList.add('bx-check');
        } else {
            elemento.classList.remove('valido');
            elemento.classList.add('invalido');
            icono.classList.remove('bx-check');
            icono.classList.add('bx-x');
        }
    }

            if (usuariosBD[usuario]) {
                alert("Ese nombre de usuario ya está registrado. Elegí otro.");
                return;
            }
            
            const usuariosRegistrados = Object.values(usuariosBD);


            const cuentaDuplicada = usuariosRegistrados.find(u => u.dni === dni || u.email === email);

        if (cuentaDuplicada) {
        alert("Ya existe una cuenta registrada con este DNI o Correo Electrónico.");
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

            alert('¡Cuenta creada con éxito!');

     const destino = localStorage.getItem('redireccionPostLogin');
            
            if (destino) {
                localStorage.removeItem('redireccionPostLogin');
                window.location.href = destino;
            } else {
                window.location.href = '../index.html';
            }
        });
    }
});