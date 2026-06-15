document.addEventListener('DOMContentLoaded', () => {
    const linkLogin = document.getElementById('link-login');
    const linkPerfil = document.getElementById('link-perfil');
    const linkReservas = document.getElementById('link-reservas'); 
    const linkLogout = document.getElementById('link-logout');

    const estaLogueado = localStorage.getItem('usuarioLogueado');

    if (estaLogueado === 'true') {
        if (linkLogin) linkLogin.style.display = 'none';
        if (linkPerfil) linkPerfil.style.display = 'inline-block';
        if (linkReservas) linkReservas.style.display = 'inline-block';
        if (linkLogout) linkLogout.style.display = 'inline-block';
    } else {
        if (linkLogin) linkLogin.style.display = 'inline-block';
        if (linkPerfil) linkPerfil.style.display = 'none';
        if (linkReservas) linkReservas.style.display = 'none';
        if (linkLogout) linkLogout.style.display = 'none';
    }

    if (linkLogout) {
        linkLogout.addEventListener('click', (e) => {
            e.preventDefault(); 
            localStorage.removeItem('usuarioLogueado'); 
            window.location.href = '../index.html'; 
        });
    }
});