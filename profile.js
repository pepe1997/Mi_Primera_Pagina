// profile.js


const token = localStorage.getItem('token');
if (token) {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    // Obtener los datos del usuario desde el servidor
    fetch(`http://localhost:3000/user/${userId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
    })
    .catch(err => console.error(err));
} else {
    window.location.href = 'login.html'; // Redirige si no hay token
}

document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:3000/update-profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Enviar el token en el encabezado
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Datos actualizados');
        }
    })
    .catch(err => console.error('Error al actualizar:', err));
});
