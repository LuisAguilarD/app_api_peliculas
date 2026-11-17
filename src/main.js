import './style.css'
import { mostrarPersonajes, obtenerPersonajes } from './api/dragonBall.js'
import { obtenerPeliculasPopulares, buscarPeliculasPorTitulo } from './api/peliculas.js'


// Probando si salen los personajes de Dragon Ball
//const personajes = await obtenerPersonajes();
// 
//console.log(personajes)

const peliculas = await obtenerPeliculasPopulares();
console.log(peliculas)

// Metodo solo para capturar la informacion de cada pelicula
function mostrarPeliculas(peliculas) {
  resultados.innerHTML = "";

  peliculas.map((pelicula) => {
    // ¿Existe release_date?
    //   SÍ → .slice(0, 4) toma los primeros 4 caracteres → "1997"
    //   NO → se usa el texto "Sin fecha"
    const anio = pelicula.release_date ? pelicula.release_date.slice(0, 4) : "Sin fecha";
    const sinopsis = pelicula.overview || "Sin sinopsis disponible.";
    // poster_path NO es la imagen completa, solo un pedazo: "/abc123.jpg"
    // Para verla hay que armar la URL: dirección base + tamaño + poster_path
    //   SÍ hay póster → "https://image.tmdb.org/t/p/w300/abc123.jpg"
    //   NO hay (null) → se usa una imagen genérica de placehold.co
    const poster = pelicula.poster_path
      ? `https://image.tmdb.org/t/p/w300${pelicula.poster_path}`
      : "https://placehold.co/300x450?text=Sin+imagen";

    resultados.innerHTML += `
      <div class="tarjeta">
        <img src="${poster}" alt="${pelicula.title}" />
        <h3>${pelicula.title}</h3>
        <p class="anio">${anio}</p>
        <p class="sinopsis">${sinopsis}</p>
      </div>
    `;
  });
}


// Metodo para cargar las Peliculas Populares
async function cargarPopulares() {
  mensaje.textContent = "Cargando...";
  try {
	  // Llamamos el metodo de la API
    const data = await obtenerPeliculasPopulares();
    mensaje.textContent = "";
    // Obtenemos los datos
    mostrarPeliculas(data.results);
  } catch (error) {
    resultados.innerHTML = "";
    mensaje.textContent = "Error de conexión. Intenta de nuevo más tarde.";
  }
}



// Buscar una película
async function buscar() {
  const texto = inputBuscar.value.trim();

  if (texto === "") {
    mensaje.textContent = "Escribe el nombre de una película.";
    return;
  }

  mensaje.textContent = "Cargando...";
  try {
    const data = await buscarPeliculasPorTitulo(texto);

    if (data.results.length === 0) {
      resultados.innerHTML = "";
      mensaje.textContent = "Película no encontrada";
      return;
    }

    mensaje.textContent = "";
    mostrarPeliculas(data.results);
  } catch (error) {
    resultados.innerHTML = "";
    mensaje.textContent = "Error de conexión. Intenta de nuevo más tarde.";
  }
}

//Llamando el metodo de cargar peliculas
cargarPopulares()

// Conectamos los botones con sus funciones
btnBuscar.addEventListener("click", buscar);
btnPopulares.addEventListener("click", cargarPopulares);

// Permite buscar también presionando la tecla Enter
inputBuscar.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    buscar();
  }
});
