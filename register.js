document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Evitar el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Crear un objeto con los datos del formulario
    const userData = {
        name,
        email,
        password
    };

    try {
        // Enviar los datos al backend usando Fetch API
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        console.log('Response from server:', data);  // Imprime la respuesta en la consola

        if (response.ok) {
            // Redirigir al usuario a la página de inicio de sesión
            alert('Usuario registrado con éxito');
            window.location.href = 'login.html';
        } else {
            alert(data.error || 'Error al registrar el usuario');
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un problema al registrar el usuario. Inténtalo de nuevo.');
    }
});
    
