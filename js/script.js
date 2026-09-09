const equipo = [
    {
        Nombre: 'José Cabello',
        rol: 'Desarrollador HTML, CSS y JavaScript',
        descripcion: 'Desarrollador web, especializado en JavaScript y CSS.',
        foto: 'IMG/jose.jpg'
    },
    {
        Nombre: 'Mario Fernández',
        rol: 'Diseñadora UI/UX',
        descripcion: 'Encargada de la experiencia de usuario, diseño visual y prototipado de la plataforma.',
        foto: 'IMG/persona2.avif'
    },
    {
        Nombre: 'Diego Torres',
        rol: 'Desarrollador Backend y Base de Datos',
        descripcion: 'Especialista en la gestión de bases de datos relacionales y lógica del servidor.',
        foto: 'IMG/persona3.avif'
    },
    {
        Nombre: 'Camila Rojas',
        rol: 'Especialista en Marketing Digital y Finanzas',
        descripcion: 'Encargada das métricas, análisis de presupuestos y estrategias de marketing online.',
        foto: 'IMG/persona3.jpg'
    },
    {
        Nombre: 'Andrés Muñoz',
        rol: 'Control de Calidad y Soporte Técnico',
        descripcion: 'Responsable de la detección de errores, pruebas de código y optimización general del sitio.',
        foto: 'IMG/personita1.avif'
    }
];


const contenedor = document.getElementById('equipo');
if (contenedor) {
    equipo.forEach(persona => {
        contenedor.innerHTML += `
            <div class="tarjeta">
                <h3>${persona.Nombre}</h3>
                <img src="${persona.foto}" alt="${persona.Nombre}" class="foto-equipo">
                <p><strong>Rol:</strong> ${persona.rol}</p>
                <p>${persona.descripcion}</p>
            </div>
        `;
    });
}

const serviciosBase = [
    {
        nombre: 'bicicleta urbana',
        precio: '10.000$',
        stock: 10,
        imagen: 'IMG/bici1.jpeg',
    },
    {
        nombre: 'bicicleta deportiva',
        precio: '15.000$',
        stock: 2,
        imagen: 'IMG/bici2.jpeg',
    },
    {
        nombre: 'bicicleta infantil',
        precio: '9.000$',
        stock: 15, 
        imagen: 'IMG/bici3.jpeg',
    },
    {
        nombre: 'bicicletas electrica',
        precio: '56.000$',
        stock: 2,
        imagen: 'IMG/bici4.jpg',
    },
    {
        nombre: 'Bicicletas gravel',
        precio: '28.000$',
        stock: 6,
        imagen: 'IMG/bici5.jpg',
    },
    {
        nombre: 'Bicicletas Montañas',
        precio: '32.000$',
        stock: 3,
        imagen: 'IMG/bici6.jpg',
    },
];

let servicios = JSON.parse(localStorage.getItem("stockBicis")) || serviciosBase;

const contenedorCatalogo = document.getElementById("catalogo");

if (contenedorCatalogo) {
    servicios.forEach((servicio, index) => {
        contenedorCatalogo.innerHTML += `
            <div class="tarjeta">
                <img src="${servicio.imagen}" alt="${servicio.nombre}">
                <h3>${servicio.nombre}</h3>
                <p>Precio: $${servicio.precio}</p>
                <p id="stock-${index}">Stock disponible: ${servicio.stock}</p>
                <button id="btn-${index}">arrendar bicicleta</button>
            </div>
        `;
    });

    servicios.forEach((servicio, index) => {
        const boton = document.getElementById(`btn-${index}`);
        if (boton) {
            boton.addEventListener('click', () => {
                if (servicio.stock > 0) {
                    servicio.stock--;
                    document.getElementById(`stock-${index}`).textContent = `Stock disponible: ${servicio.stock}`;

                    localStorage.setItem("stockBicis", JSON.stringify(servicios));

                    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
                    reservas.push({
                        bicicleta: servicio.nombre,
                        precio: servicio.precio,
                        fecha: new Date().toLocaleString()
                    });
                    localStorage.setItem("reservas", JSON.stringify(reservas));
                } else {
                    alert("Sin stock disponible");
                }
            });
        }
    });
}


const usuario = "admin";
const clave = "1234";

const boton = document.getElementById("btnIngresar");

if (boton) {
    boton.addEventListener("click", () => {
        let usuario_ingresado = document.getElementById("usuario").value;
        let clave_ingresada = document.getElementById("clave").value;

        if (usuario_ingresado === usuario && clave_ingresada === clave) {
            document.getElementById("mensajeLogin").textContent = "Ingresó correctamente";
            document.querySelector(".recuadrov1").style.display = "none";
            document.getElementById("panelAdmin").style.display = "block";
            localStorage.setItem("sesionAdmin", "true");
            mostrarReservas();
        } else if (usuario_ingresado === usuario && clave_ingresada !== clave) {
            document.getElementById("mensajeLogin").textContent = "Contraseña incorrecta";
        } else {
            document.getElementById("mensajeLogin").textContent = "Usuario o contraseña incorrectos";
        }
    });
}

function mostrarReservas() {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    if (!cuerpoTabla) return;

    cuerpoTabla.innerHTML = "";
    reservas.forEach(reserva => {
        cuerpoTabla.innerHTML += `
            <tr>
                <td>${reserva.bicicleta}</td>
                <td>$${reserva.precio}</td>
                <td>${reserva.fecha}</td>
            </tr>
        `;
    });
}

if (localStorage.getItem("sesionAdmin") === "true") {
    const recuadroLogin = document.querySelector(".recuadrov1");
    const panel = document.getElementById("panelAdmin");
    if (recuadroLogin && panel) {
        recuadroLogin.style.display = "none";
        panel.style.display = "block";
        mostrarReservas();
    }
}

const btnCerrarSesion = document.getElementById("btnCerrarSesion");
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("sesionAdmin");
        document.getElementById("panelAdmin").style.display = "none";
        document.querySelector(".recuadrov1").style.display = "block";
        document.getElementById("mensajeLogin").textContent = "";
        document.getElementById("usuario").value = "";
        document.getElementById("clave").value = "";
    });
}

const btnReset = document.getElementById("btnReset");
if (btnReset) {
    btnReset.addEventListener("click", () => {
        localStorage.removeItem("stockBicis");
        localStorage.removeItem("reservas");
        localStorage.removeItem("sesionAdmin");
        location.reload();
    });
}

const barraEstado = document.getElementById("barraEstado");
if (barraEstado) {
    if (localStorage.getItem("sesionAdmin") === "true") {
        barraEstado.textContent = "Bienvenido, Administrador";
        barraEstado.style.color = "green";
    }
}


const formFinanzas = document.getElementById('form-finanzas');
if (formFinanzas) {
    formFinanzas.addEventListener('submit', function (e) {
        e.preventDefault();

        const cpc = parseFloat(document.getElementById('cpc').value.trim());
        const clics = parseFloat(document.getElementById('clics').value.trim());
        const resultadoDiv = document.getElementById('resultado-finanzas');

        if (isNaN(cpc) || isNaN(clics) || cpc <= 0 || clics <= 0) {
            resultadoDiv.innerHTML = `<div style="color: rgb(170, 26, 41); font-weight: bold; text-align: center; font-size: 13px;">Campo ingresado erróneo</div>`;
            return;
        }

        const totalPresupuesto = cpc * clics;
        let html = `<div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">`;
        html += `<div style="color: rgb(20, 95, 37); font-weight: bold; text-align: center; font-size: 14px;">Presupuesto Estimado: $${totalPresupuesto.toLocaleString('es-CL')} CLP / mes</div>`;

        if (totalPresupuesto > 50000) {
            html += `<div style="background-color: #fff3cd; color: #856404; border: 1px solid #ffeeba; border-radius: 6px; padding: 10px; text-align: center; font-weight: bold;">⚠️ Advertencia: el presupuesto mensual supera los $50.000</div>`;
        }

        html += `</div>`;

        resultadoDiv.innerHTML = html;
    });
}

const formContacto = document.getElementById("form-contacto");
if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
        e.preventDefault();
        const errores = document.getElementById("errores-contacto");
        errores.innerHTML = "";

        const nombre = document.getElementById("nombreContacto").value.trim();
        const telefono = document.getElementById("telefonoContacto").value.trim();
        let valido = true;

        if (nombre === "") {
            errores.innerHTML += `<p style="color: red; margin: 4px 0;">El nombre es obligatorio</p>`;
            valido = false;
        }

        if (telefono === "") {
            errores.innerHTML += `<p style="color: red; margin: 4px 0;">El teléfono es obligatorio</p>`;
            valido = false;
        } else if (isNaN(telefono)) {
            errores.innerHTML += `<p style="color: red; margin: 4px 0;">El teléfono debe contener solo números</p>`;
            valido = false;
        }

        if (valido) {
            errores.innerHTML = `<p style="color: lightgreen; margin: 4px 0;">Formulario enviado correctamente</p>`;
        }
    });
}