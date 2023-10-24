function buscarClientePorDni() {
    var dni = document.getElementById('dni').value;
    const config = {
        url: `https://cork-be.onrender.com/getcustomer/${dni}`,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    };

    axios(config)
        .then(response => {
            var clienteData = response.data[0]; // Suponiendo que la respuesta contiene los datos del cliente
            mostrarDatosCliente(clienteData); // Llamar a la función para mostrar los datos en la página
        })
        .catch(error => {
            // Manejar errores
            console.error(error);
        });
}



function guardarCliente() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var dni = document.getElementById('dni').value;
    var fechanac = document.getElementById('fechanac').value;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value;

    var data = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        fechanac: fechanac,
        telefono: telefono,
        email: email
    };

    axios.post('https://cork-be.onrender.com/customer/', data)
        .then(response => {
            // Manejar la respuesta del servidor
            console.log(response.data);

            // Mostrar el mensaje de cliente registrado
            var mensajeRegistro = document.getElementById('mensajeRegistro');
            mensajeRegistro.textContent = 'Cliente registrado correctamente';
        })
        .catch(error => {
            // Manejar errores
            console.error(error);

            // En caso de error, puedes mostrar un mensaje de error en lugar del mensaje de registro
            var mensajeRegistro = document.getElementById('mensajeRegistro');
            mensajeRegistro.textContent = 'Error al registrar el cliente';
        });
}

function mostrarDatosCliente(data) {
    document.getElementById('nombreCliente').textContent = `${data.Nombre}` + ` ` + `${data.Apellido}`;
    document.getElementById('dniCliente').textContent = `${data.DNI}`;
    document.getElementById('fechanacCliente').textContent = `${data.FechaNacimiento}`;
    document.getElementById('telefonoCliente').textContent = `${data.Telefono}`;
    document.getElementById('emailCliente').textContent = `${data.Email}`;
}






