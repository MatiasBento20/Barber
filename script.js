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
    const data = {
        "dni": dni,
        "nombre": nombre,
        "apellido": apellido,
        "fechaNacimiento": fechanac,
        "email": email,
        "telefono": telefono,
    };

    axios.post(`https://cork-be.onrender.com/customer/`, data)
        .then(response => {
            // Manejar la respuesta del servidor
            console.log(response.data);
        })
        .catch(error => {
            // Manejar errores
            console.error(error);
        });
}
function mostrarDatosCliente(data) {
    document.getElementById('nombreCliente').textContent = `${data.Nombre}`;
    document.getElementById('apellidoCliente').textContent = `${data.Apellido}`;
    document.getElementById('dniCliente').textContent = `${data.DNI}`;
    document.getElementById('fechanacCliente').textContent = `${data.FechaNacimiento}`;
    document.getElementById('telefonoCliente').textContent = `${data.Telefono}`;
    document.getElementById('emailCliente').textContent = `${data.Email}`;
}






