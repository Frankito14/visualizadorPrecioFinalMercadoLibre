const spanPrecioRestante = (precio) => {
    const span = document.createElement("span")
    span.textContent = "Te quedan: $"+precio
    span.style.color = "#007036"
    span.style.fontWeight = '600'
    return span
}

const obtenerElementosConClase = (clase)=>{
   return document.getElementsByClassName(clase)
}

//Listas de precios
const listaPublicaciones = () => {
    return obtenerElementosConClase("sc-list-channel-content__grid")
}

const listaPreciosCargoVenta = () => {
    const elements = document.getElementsByClassName("pricing-management-table__title")
    const precios = Array.from(elements).map(element => element.childNodes[1].innerText)
    return precios
}

const listaPreciosEnvio = () => {
    const elements = document.getElementsByClassName("sc-list-actionable-cell sc-list-actionable-cell__shipping")
    const precios = Array.from(elements).map(element => elCompradorPagaElEnvio(element) ? "$ 0" : element.childNodes[1].children[0].innerText.substring(6, 13))
    console.log(precios)
    return precios
}

const listaPreciosPublicacion = () => {
    const elements = document.getElementsByClassName("sc-list-actionable-cell sc-list-actionable-cell__price")
    const precios = Array.from(elements).map(element => element.childNodes[0].innerText)
    return precios
}

const precioANumero = (precio) =>{
    let num
    if (precio.includes(","))
     num = Number(precio.substring(2, precio.indexOf(',')).replace(".", ""))
    else
     num = Number(precio.substring(2, 20).replace(".", ""))
    return num
}

const elCompradorPagaElEnvio = (element) => element.childNodes.length == 2

//Agregar precios
const agregarPrecios = (publicacion, index) => {
    publicacion.precioCargoVenta = precioANumero(listaPreciosCargoVenta()[index])
    publicacion.precioEnvio = precioANumero(listaPreciosEnvio()[index])
    publicacion.precioPublicacion = precioANumero(listaPreciosPublicacion()[index])
    publicacion.precioRestante = publicacion.precioPublicacion - publicacion.precioCargoVenta - publicacion.precioEnvio
    publicacion.childNodes[1].appendChild(spanPrecioRestante(publicacion.precioRestante))
}

const agregarPreciosAPublicaciones = () => {
    const publicaciones = listaPublicaciones()
    Array.from(publicaciones).forEach((publicacion, index) => agregarPrecios(publicacion, index) )
    console.log("Precios modificados")
    console.log(publicaciones)
}

const TIEMPO_ESPERA = 1000

//setTimeout(() => {console.clear(); agregarPreciosAPublicaciones()}, TIEMPO_ESPERA)
setTimeout(() => {console.clear(); agregarPreciosAPublicaciones()}, TIEMPO_ESPERA)



