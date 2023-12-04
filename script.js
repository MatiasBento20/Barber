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
    document.getElementById('puntosTotales').textContent = `Puntos totales: ${data.PuntosTotales}`;
}

// Funcion de Guardar Corte//
function guardarCorte() {
    var montoCobrado = document.getElementById('monto').value;
    var detalle = document.getElementById('detalle').value;
    var fecha = document.getElementById('fecha').value;
    var empleado = document.getElementById('empleado').value;
    var dni = document.getElementById('dni').value;
    var sucursal = document.getElementById('sucursal').value;
    var puntos = document.getElementById('puntos').value;


    var data = {
        monto: montoCobrado,
        detalle: detalle,
        fecha: transformarFecha(fecha),
        employeeid: empleado,
        dni: dni,
        sucursalId: sucursal,
        puntosTotales: puntosTotales,
        
    };
    const config = {
        url: `https://cork-be.onrender.com/transactions`,
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
            document.getElementById('monto').value = '';
            document.getElementById('detalle').value = '';
            document.getElementById('fecha').value = '';
            document.getElementById('empleado').value = '';
            sumarPuntos(dni, monto);
            alert(response.data.mensaje);
        });
      
}

function sumarPuntos(dni, monto) {
    var puntos = monto/1000;

    var data = {
        puntos: puntos,
        dni: dni,
        
    };
    const config = {
        url: `http://cork-be.onrender.com/puntos`,
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        data: data
    };


    axios(config)
        .then(response => {
            console.log(response.data);
            alert(response.data.mensaje);
        })
      
}

function buscarTransaccionPorDni() {
    var dni = document.getElementById('dni').value;
    const config = {
        url: `https://cork-be.onrender.com/transactions/${dni}`,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
    };

    axios(config)
        .then(response => {
            var clienteData = response; // Suponiendo que la respuesta contiene los datos del cliente
            mostrarTransacciones(clienteData.data); // Llamar a la función para mostrar los datos en la página
        })
        .catch(error => {
            // Manejar errores
            console.error(error);
        });
}

function mostrarTransacciones(datas) {
    const listaTransacciones = document.getElementById('listaTransacciones');

    // Limpiamos el contenido previo de la lista
    listaTransacciones.innerHTML = '';

    // Obtener solo las últimas 5 transacciones
    const ultimas5Transacciones = datas.slice(-3);

    ultimas5Transacciones.forEach(data => {
        const transaccionDiv = document.createElement('div');
        transaccionDiv.classList.add('transaccion');

        const transaccionText = document.createElement('p');
        transaccionText.textContent = `Monto Cobrado: ${data.monto} - Detalle: ${data.detalle} - Fecha: ${data.fecha} - Puntos Totales: ${data.PuntosTotales}`;
        transaccionDiv.appendChild(transaccionText);

        listaTransacciones.appendChild(transaccionDiv);
    });


}


