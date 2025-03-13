// Función para mostrar los campos del método de pago seleccionado
function showPaymentFields() {
    const paymentMethod = document.getElementById('payment-method').value;
    const paymentFields = document.getElementById('paymentFields');
    
    // Oculta todos los campos y deshabilítalos
    const options = document.querySelectorAll('.payment-options');
    options.forEach(option => {
        option.style.display = 'none';
        const inputs = option.querySelectorAll('input, select, textarea');
        inputs.forEach(input => input.disabled = true);
    });

    if (paymentMethod) {
        paymentFields.style.display = 'block'; // Muestra la sección de pago
        
        // Muestra y habilita los campos correspondientes según el método seleccionado
        const selectedOption = document.querySelector(`.payment-options.${paymentMethod}`);
        selectedOption.style.display = 'block';
        const inputs = selectedOption.querySelectorAll('input, select, textarea');
        inputs.forEach(input => input.disabled = false);
    } else {
        paymentFields.style.display = 'none'; // Oculta si no hay método seleccionado
    }
}



