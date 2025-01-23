document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Evitar el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Crear un objeto con los datos del formulario
    const loginData = {
        email,
        password
    };

    try {
        // Enviar los datos al backend usando Fetch API
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
            // Guardar el token en localStorage
            console.log('Token recibido:', data.token); // <-- AGREGA ESTO
            localStorage.setItem('token', data.token);  // Asegúrate de que 'data.token' sea el token real del servidor

            // Redirigir a la página principal después del login exitoso
            alert('Inicio de sesión exitoso');
            window.location.href = 'index.html';  // O la página principal de tu app
        } else {
            alert(data.error || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un problema al iniciar sesión. Inténtalo de nuevo.');
    }
});
