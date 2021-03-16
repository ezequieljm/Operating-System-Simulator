function renderizarFormulario() {
    let $contenedorFormulario = document.createElement('div')
    $contenedorFormulario.setAttribute('id','contenedor-formulario')
    $contenedorFormulario.setAttribute('class', 'blue darken-3 card-panel')
    //$contenedorFormulario.setAttribute('class','blue lighten-1')

    //PARTE PARA EL FORMULARIO
    let $partForm = document.createElement('div')
    $partForm.setAttribute('id','parte-formulario')

    //PARTE PARA LOS BOTONES
    let $partBoton = document.createElement('div')
    $partBoton.setAttribute('id', 'parte-botones')

    //FORMULARIO
    let $formulario = document.createElement('form')

    //NOMBRE DEL PROCESO
    let $labelNombreProceso = document.createElement('label')
    $labelNombreProceso.innerHTML = "Nombre:"
    $labelNombreProceso.setAttribute('class', 'white-text')
    let $nombreProceso = document.createElement('input')
    $nombreProceso.setAttribute('class','white-text')
    $nombreProceso.setAttribute('id','nombre-proceso')
    $nombreProceso.setAttribute('type', 'text')
    $nombreProceso.setAttribute('placeholder', 'Nombre:')

    //TAMAÑO DEL PROCESO
    let $labelDimension = document.createElement('label')
    $labelDimension.setAttribute('class', 'white-text')
    $labelDimension.innerHTML = "Tamaño:"
    let $dimension = document.createElement('input')
    $dimension.setAttribute('class','white-text')
    $dimension.setAttribute('id','dimension')
    $dimension.setAttribute('type', 'number')
    $dimension.setAttribute('placeholder', 'Tamaño:')

    //TIEMPO DE ARRIBO
    let $labelArribo = document.createElement('label')
    $labelArribo.innerHTML = "Tiempo de Arribo:"
    $labelArribo.setAttribute('class', 'white-text')
    let $arribo = document.createElement('input')
    $arribo.setAttribute('class','white-text')
    $arribo.setAttribute('id','arribo')
    $arribo.setAttribute('type', 'number')
    $arribo.setAttribute('placeholder', 'Tiempo de arribo:')

    //TIEMPO DE IRRUPCION
    let $labelIrrupcion = document.createElement('label')
    $labelIrrupcion.innerHTML = "Tiempo de Irrupción:"
    $labelIrrupcion.setAttribute('class', 'white-text')
    let $irrupcion = document.createElement('input')
    $irrupcion.setAttribute('class','white-text')
    $irrupcion.setAttribute('id','irrupcion')
    $irrupcion.setAttribute('type', 'number')
    $irrupcion.setAttribute('placeholder', 'Tiempo de irrupción:')

    //AGREGAMOS UN TITULO
    let $tituloFormulario = document.createElement('h5')
    $tituloFormulario.innerHTML = "Datos del proceso"
    $tituloFormulario.setAttribute('class','white-text')

    //AGREGAMOS UNA LINEA SEPARADORA
    let $separadorHr = document.createElement('hr')

    //AGREGAMOS LOS ELEMENTOS
    $formulario.appendChild($tituloFormulario)
    $formulario.appendChild($separadorHr)
    //$formulario.appendChild($labelNombreProceso)
    $formulario.appendChild($nombreProceso)
    //$formulario.appendChild($labelDimension)
    $formulario.appendChild($dimension)
    //$formulario.appendChild($labelArribo)
    $formulario.appendChild($arribo)
    //$formulario.appendChild($labelIrrupcion)
    $formulario.appendChild($irrupcion)

    //BOTON AGREGAR
    let $botonAgregar = document.createElement('button')
    $botonAgregar.setAttribute('id', 'agregar')
    $botonAgregar.setAttribute('type', 'reset')
    $botonAgregar.setAttribute('class', 'green btn')
    $botonAgregar.innerHTML = "Agregar Proceso"

    //BOTON VOLVER ATRAS
    let $botonRecargar = document.createElement('input')
    $botonRecargar.setAttribute('id','boton-recargar')
    $botonRecargar.setAttribute('class','btn red darken-3')
    $botonRecargar.setAttribute('type','button')
    $botonRecargar.setAttribute('value','Atras')

    $formulario.appendChild($botonRecargar)
    $formulario.appendChild($botonAgregar)


    $partForm.appendChild($formulario)

    //BOTON SIMULAR
    let $botonSimular = document.createElement('button')
    $botonSimular.setAttribute('id', 'simular')
    $botonSimular.setAttribute('type', 'button')
    $botonSimular.setAttribute('class', 'green btn')
    $botonSimular.innerHTML = "Iniciar"
    $partBoton.appendChild($botonSimular)

    //AGREGAMOS EL FORMULARIO
    $contenedorFormulario.appendChild($partForm)
    $contenedorFormulario.appendChild($partBoton)

    return $contenedorFormulario
}

