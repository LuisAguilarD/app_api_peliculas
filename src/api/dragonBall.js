// Capa para consumir los personajes de Dragon Ball desde la API


export async function obtenerPersonajes() {
    // fetch es el metodo que permite consumir un endpoint de una API
  const response =  await fetch("https://dragonball-api.com/api/characters") //Promesa (Respuesta donde se puede cumplir o no)
  const data = await response.json() // Convierte la respuesta en JSON
  return data
}

// Metodo para mostrar la informacion del personaje
export async function mostrarPersonajes() {
    // Obteniendo la lista de los personajes
    const response = await obtenerPersonajes()
    // de la respuiesta de la api solo accedemos al arreglo de los personajes
    const listaPersonajes = response.items;
    
    // iterando con el arreglo de personaje
    return listaPersonajes.map((personaje) => {
      console.log(personaje)
    return `
      <div>
        <h2>${personaje.name}</h2>
        <p>Raza: ${personaje.race}</p>
        <img src=${personaje.image} style="width: 100px" />
      </div>
    `
    })
}

function saludo() {

}
