const spanPrecioRestante = (precio) => {
    const span = document.createElement("span")
    span.textContent = "Te quedan: $"+precio
    span.style.color = "#007036"
    span.style.fontWeight = '600'
    return span
}

//Listas de precios
const listaPublicaciones = () => {
    //Retorna con todas las publicaciones
    //HTMLcollection
    return document.getElementsByClassName("sc-list-channel-content__grid")
}

const listaPreciosCargoVenta = () => {
    //Retorna una lista con los precios de cargo de venta de todas las publicaciones
    //Lista
    const elements = document.getElementsByClassName("pricing-management-table__title")
    const precios = Array.from(elements).map(element => precio(element.childNodes[1].innerText))
    return precios
}

const listaPreciosEnvio = () => {
    //Retorna una lista con los precios de envio de todas las publicaciones
    //Lista
    const elements = document.getElementsByClassName("sc-list-actionable-cell sc-list-actionable-cell__shipping")
    const precios = Array.from(elements).map(element => elCompradorPagaElEnvio(element) ? 0 : precio(element.childNodes[1].children[0].innerText))
    return precios
}

const listaPreciosPublicacion = () => {
    //Retorna una lista con los precios de todas las publicaciones
    //Lista
    const elements = document.getElementsByClassName("sc-list-actionable-cell sc-list-actionable-cell__price")
    const precios = Array.from(elements).map(element => precio(element.childNodes[0].innerText))
    return precios
}

const precioEnFormatoArgentino = (precio) =>{
    //Recibe un precio numerico y retorna el precio en formato ars
    //String
    // 15000.99 -> $15.000,99
    return new Intl.NumberFormat(["ban", "id"]).format(precio)
}

const elCompradorPagaElEnvio = (element) => element.childNodes.length == 2

//Agregar precios
const agregarPrecios = (publicacion, index) => {
    //Agrega como propiedades todos los precios a una publicacion y añade un elemento que muestre el precio restante
    publicacion.precioCargoVenta = listaPreciosCargoVenta()[index]
    publicacion.precioEnvio = listaPreciosEnvio()[index]
    publicacion.precioPublicacion = listaPreciosPublicacion()[index]
    publicacion.precioRestante = publicacion.precioPublicacion - publicacion.precioCargoVenta - publicacion.precioEnvio
    publicacion.childNodes[1].appendChild(spanPrecioRestante(precioEnFormatoArgentino(publicacion.precioRestante)))
}

const agregarPreciosAPublicaciones = () => {
    //Agrega el precio restante a todas las publicaciones
    const publicaciones = listaPublicaciones()
    Array.from(publicaciones).forEach((publicacion, index) => agregarPrecios(publicacion, index) )
}

const precio = (string) =>{
    //Recibe un string con un precio y retorna el precio 
    //Numero
    // "Pagás $ 1.822,99 de cargo por venta tota" -> 822
    const regex = /\d+(?:\.\d+)?/g
    const match = string.match(regex);  //[1.822, 99]
    match[0] = match[0].replace(".", "") //[1822, 99]
    let price = (match.length == 2) ? match[0]+"."+match[1] : match[0] // "1822.99"
    return Number(price) //1822.99
}

const TIEMPO_ESPERA = 3000
setTimeout(() => {console.clear(); agregarPreciosAPublicaciones()}, TIEMPO_ESPERA)



