document.addEventListener('DOMContentLoaded', () => {
    const formPerfil = document.getElementById('form-datos-perfil');
    const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario')) || {};
    document.getElementById('perfil-nombre').textContent = datosGuardados.nombre || '-';
    document.getElementById('perfil-email').textContent = datosGuardados.email || '-';
    
    document.getElementById('input-nombre').value = datosGuardados.nombre || '';
    document.getElementById('input-email').value = datosGuardados.email || '';
    document.getElementById('input-nacionalidad').value = datosGuardados.nacionalidad || '';
    document.getElementById('input-dni').value = datosGuardados.dni || '';
    document.getElementById('input-telefono').value = datosGuardados.telefono || '';

    formPerfil.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const passActualIngresada = document.getElementById('input-pass-actual').value;
        const passNueva = document.getElementById('input-pass-nueva').value;
        
        let nuevaPassword = datosGuardados.password;
        if (passActualIngresada !== "" || passNueva !== "") {
            if (passActualIngresada !== datosGuardados.password) {
                alert('Error: La contraseña actual es incorrecta.');
                return;
            }
            if (passNueva === "") {
                alert('Error: Debes ingresar la nueva contraseña.');
                return;
            }
            nuevaPassword = passNueva;
        }

        const nuevosDatos = {
            ...datosGuardados,
            nombre: document.getElementById('input-nombre').value,
            email: document.getElementById('input-email').value,
            nacionalidad: document.getElementById('input-nacionalidad').value,
            dni: document.getElementById('input-dni').value,
            telefono: document.getElementById('input-telefono').value,
            password: nuevaPassword
        };
        localStorage.setItem('datosUsuario', JSON.stringify(nuevosDatos));
        alert('Cambios guardados con éxito.');
        location.reload();
    });

    document.getElementById('btn-cancelar').addEventListener('click', () => {
        location.reload();
    });
});