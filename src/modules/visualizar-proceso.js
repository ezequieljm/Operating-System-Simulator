function renderViProces() {
    //GENERAMOS UN ELEMENTO CONTENEDOR DE LOS PROCESOS
    let $contenedorProceso = document.createElement('div')
    $contenedorProceso.setAttribute('id', 'contenedor-procesos')
    $contenedorProceso.setAttribute('class','green card-panel')

    let $tituloProcesos = document.createElement('h5')
    $tituloProcesos.setAttribute('class','white-text')
    $tituloProcesos.innerHTML = "Procesos"

    let $itemHr = document.createElement('hr')

    $contenedorProceso.appendChild($tituloProcesos)
    $contenedorProceso.appendChild($itemHr)

    return $contenedorProceso
}