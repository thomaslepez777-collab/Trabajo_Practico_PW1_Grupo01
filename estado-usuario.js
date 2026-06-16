document.addEventListener('DOMContentLoaded', () => {

    const linksReset = document.querySelectorAll('a[href="../index.html"], a[href="Vuelos.html"]');
    linksReset.forEach(link => {
        link.addEventListener('click', () => {
            localStorage.removeItem('filtroDestino');
        });
    });
    const linkLogin = document.getElementById('link-login');
    const linkPerfil = document.getElementById('link-perfil');
    const linkReservas = document.getElementById('link-reservas'); 
    const linkLogout = document.getElementById('link-logout');

    const estaLogueado = localStorage.getItem('usuarioLogueado') === 'true';
    const actualizarMenu = (logueado) => {
        if (logueado) {
            if (linkLogin) linkLogin.classList.add('link-oculto');
            if (linkPerfil) linkPerfil.classList.remove('link-oculto');
            if (linkReservas) linkReservas.classList.remove('link-oculto');
            if (linkLogout) linkLogout.classList.remove('link-oculto');
        } else {
            if (linkLogin) linkLogin.classList.remove('link-oculto');
            if (linkPerfil) linkPerfil.classList.add('link-oculto');
            if (linkReservas) linkReservas.classList.add('link-oculto');
            if (linkLogout) linkLogout.classList.add('link-oculto');
        }
    };
    actualizarMenu(estaLogueado);

    if (linkLogout) {
        linkLogout.addEventListener('click', (e) => {
            e.preventDefault(); 
            localStorage.removeItem('usuarioLogueado'); 
            window.location.href = '../index.html'; 
        });
    }
});