function formularioProceso() {
    let $contenedorFormularioProceso = document.createElement('div')
    $contenedorFormularioProceso.setAttribute('id','contenedor-formulario-proceso')
    $contenedorFormularioProceso.setAttribute('class','grey darken-4 card-panel')
    let $formularioCont = renderizarFormulario()
    let $visualizarProcesos = renderViProces()

    $contenedorFormularioProceso.appendChild($formularioCont)
    $contenedorFormularioProceso.appendChild($visualizarProcesos)

    return $contenedorFormularioProceso
}