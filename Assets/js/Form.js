// Seleccionamos el formulario
const form = document.getElementById("formulario");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const datos = Object.fromEntries(new FormData(form));


  let usuarios = JSON.parse(localStorage.getItem("datos")) || [];
  

  usuarios.push(datos);


  localStorage.setItem("datos", JSON.stringify(usuarios));


  form.reset();


  mostrarUsuarios();
});

function mostrarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem("datos")) || [];
  const lista = document.getElementById("lista-usuarios");

  lista.innerHTML = "<h2>Datos registrados</h2>";

  if (usuarios.length === 0) {
    lista.innerHTML += "<p>No hay datos registrados.</p>";
    return;
  }

  const tabla = document.createElement("table");
  tabla.style.width = "100%";
  tabla.style.borderCollapse = "collapse";

  const encabezado = document.createElement("tr");
  Object.keys(usuarios[0]).forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key;
    encabezado.appendChild(th);
  });
  tabla.appendChild(encabezado);

  usuarios.forEach((usuario) => {
    const fila = document.createElement("tr");
    Object.values(usuario).forEach((valor) => {
      const td = document.createElement("td");
      td.textContent = valor;
      fila.appendChild(td);
    });
    tabla.appendChild(fila);
  });

  lista.appendChild(tabla);
}

mostrarUsuarios(); // carga los datos al entrar
