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

            let usuariosBD = JSON.parse(localStorage.getItem('arjet_usuarios')) || {};

            // Validamos que exista y la pass sea correcta
            if (usuariosBD[nombreUsuario] && usuariosBD[nombreUsuario].password === password) {
                
                // Guardamos QUIÉN es el que inició sesión
                localStorage.setItem('arjet_usuario_activo', nombreUsuario);

                const destino = localStorage.getItem('redireccionPostLogin');
                if (destino) {
                    localStorage.removeItem('redireccionPostLogin');
                    window.location.href = destino;
                } else {
                    window.location.href = '../index.html';
                }
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        });
    }
});