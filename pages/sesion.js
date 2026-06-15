document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', (evento) => {
            evento.preventDefault();
            localStorage.setItem('usuarioLogueado', 'true');
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