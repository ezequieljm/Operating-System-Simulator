function cardPanelProcesos(nuevoProcesoParm) {
    let $tarjeta = document.createElement('div')
    $tarjeta.setAttribute('class', 'card-panel blue darken-3')
    
    //CREAMOS LOS ELEMENTOS A MOSTRAR
    let $tituloNombre = document.createElement('p')
    $tituloNombre.setAttribute('class','white-text')
    let $tituloDimension = document.createElement('p')
    $tituloDimension.setAttribute('class','white-text')
    let $tituloArribo = document.createElement('p')
    $tituloArribo.setAttribute('class','white-text')
    let $tituloIrrupcion = document.createElement('p')
    $tituloIrrupcion.setAttribute('class','white-text')

    //AGREGAMOS LOS DATOS
    $tituloNombre.innerHTML = `Nombre: ${nuevoProcesoParm.nombre}` 
    $tituloDimension.innerHTML = `Tamaño: ${nuevoProcesoParm.dimension}`
    $tituloArribo.innerHTML = `Arribo: ${nuevoProcesoParm.arribo}`
    $tituloIrrupcion.innerHTML = `Irrupcion: ${nuevoProcesoParm.irrupcion}`

    //AGREGAMOS LOS ELEMENTOS A LA TARJETA
    $tarjeta.appendChild($tituloNombre)
    $tarjeta.appendChild($tituloDimension)
    $tarjeta.appendChild($tituloArribo)
    $tarjeta.appendChild($tituloIrrupcion)

    return $tarjeta

}