document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const avisoCompra = document.getElementById('aviso-compra');
    if (localStorage.getItem('mostrarAvisoLogin') === 'true') {
        if (avisoCompra) {
            avisoCompra.classList.remove('aviso-oculto'); 
        }
        localStorage.removeItem('mostrarAvisoLogin'); 
    }

    if (formLogin) {
        formLogin.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
            const password = document.getElementById('contraseña').value.trim();

            const usuarioActual = {
                nombre: nombreUsuario,
                email: nombreUsuario.toLowerCase().replace(' ', '') + '@gmail.com', // Simulamos un mail
                password: password
            };
            localStorage.setItem('usuarioLogueado', 'true');
            localStorage.setItem('datosUsuario', JSON.stringify(usuarioActual));

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