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

function transformarFecha(fecha) {
    const fechaOriginal = new Date(fecha);
    const dia = fechaOriginal.getDate().toString().padStart(2, '0');
    const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript comienzan desde 0 (enero es 0).
    const año = fechaOriginal.getFullYear().toString();
  
    return `${dia}-${mes}-${año}`;
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
        fechaNacimiento: transformarFecha(fechanac),
        telefono: telefono,
        email: email
    };

    const config = {
        url: `https://cork-be.onrender.com/customer`,
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        data: data
    };


    axios(config)
        .then(response => { // Manejar la respuesta del servidor
            console.log(response.data);
            // Limpiar los campos del formulario
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('dni').value = '';
            document.getElementById('fechanac').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('email').value = '';
            alert(response.data.mensaje);
        })
        .catch(error => {
            // Manejar errores
            console.error(error);
            if( error.errno == 1062 ) {
                alert("Ya existe un usuario con ese DNI");
            }

        });
}

function mostrarDatosCliente(data) {
    document.getElementById('nombreCliente').textContent = `${data.Nombre}` + ` ` + `${data.Apellido}`;
    document.getElementById('dniCliente').textContent = `${data.DNI}`;
    document.getElementById('fechanacCliente').textContent = `${data.FechaNacimiento}`;
    document.getElementById('telefonoCliente').textContent = `${data.Telefono}`;
    document.getElementById('emailCliente').textContent = `${data.Email}`;
}