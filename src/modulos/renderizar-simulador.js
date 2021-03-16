function interfaceSimulador(arregloDeEstados) {
    //ESTA FUNCION RECIBE COMO PARAMETRO EL ARREGLO DE ESTADOS DEL SIMULADOR

    //OBTENEMOS UNA REFERENCIA AL CONTENEDOR PRINCIPAL
    let $contenedorPrincipal = document.getElementById('contenedor-principal')
    $contenedorPrincipal.innerHTML = "" //BORRAMOS SU CONTENIDO

    //EN EL ARREGLO DE ESTADOS, TODOS LOS ELEMENTOS IMPARES SON LA DESCRIPCION DEL EVENTO Y TODOS LOS ELEMETOS PARES SON EL OBJETO KERNEL

    //PRIMERO CREAMOS LA ESTRUCTURA DEL SIMULADOR
    let $contenedorDos = document.createElement('div')
    $contenedorDos.setAttribute('id', 'contenedor-dos')
    $contenedorDos.setAttribute('class', 'card-panel green materialize')

    for (let i = 0; i < arregloDeEstados.length - 1; i++) {

        //CREAMOS EL CONTENEDOR DEL EVENTO Y DEL ESTADO
        let $contenedorEventoEstado = document.createElement('div')
        $contenedorEventoEstado.setAttribute('class', 'blue darken-1 card-panel contenedor-evento-estado')

        if (i == 1) {

            //OBTENEMOS UNA REFERENCIA A LOS ELEMENTOS DEL ESTADO

            /***************************************************************************************************/

            //FILTRAMOS LOS PROCESOS QUE ESTAN EN EL DISCO
            let procEnDisco = arregloDeEstados[1].listaDeProcesos.filter(function (proceso) {
                return proceso.estado == "EN EL DISCO"
            })

            //OBTENEMOS LAS PARTICIONES
            let arregloParticiones = arregloDeEstados[1].memoria.particiones

            //OBTENEMOS LA DIMENSION DE LA MEMORIA
            let dimensionMemoria = arregloDeEstados[1].memoria.dimension

            //OBTENEMOS LA FRAGMENTACION DE LA MEMORIA
            let fragMemoria = arregloDeEstados[1].memoria.fragmentacion

            //OBTENEMOS UNA REFERENCIA A LA CPU
            let cpuProcEje = arregloDeEstados[1].cpu.procesoEjecutando.nombre
            let $cpuProcEje = document.createElement('p')
            $cpuProcEje.innerHTML = cpuProcEje

            //CREAMOS LOS ELEMENTOS PARA MOSTRAR

            //CREAMOS UN TITULO
            let $tituloDelEvento = document.createElement('h3')
            $tituloDelEvento.innerHTML = arregloDeEstados[0]
            $contenedorEventoEstado.appendChild($tituloDelEvento)

            /***************************************************************************************************/
            //TITULO DEL DATO
            let $tituloDatosProcesos = document.createElement('h3')
            $tituloDatosProcesos.innerHTML = "Lista de procesos"

            //CONTENEDOR LISTA DE PROCESOS
            let $contProcesos = document.createElement('div')
            $contProcesos.setAttribute('class', 'card-panel contenedor-datos-proceso')

            $contProcesos.appendChild($tituloDatosProcesos)

            //LISTA DESORDENADA. CONTENEDOR PARA LOS PROCESOS 
            let $listProcesosPanel = document.createElement('div')
            $listProcesosPanel.setAttribute('id', 'cont-procesos-panel')
            $listProcesosPanel.setAttribute('class', 'materialize')

            procEnDisco.forEach(function (proceso) {

                //CREAMOS LA TARJETA PARA CADA PROCESO
                let $cardPanelProceso = document.createElement('div')
                $cardPanelProceso.setAttribute('class', 'card-panel blue lighten-2')

                //NOMBRE DEL PROCESO
                let $tagPNombre = document.createElement('h5')
                $tagPNombre.innerHTML = `${proceso.nombre}`

                //TAMAÑO DEL PROCESO
                let $tagPDimension = document.createElement('p')
                $tagPDimension.innerHTML = `Tamaño: ${proceso.dimension}`

                //TIEMPO DE ARRIBO
                let $tagPArribo = document.createElement('p')
                $tagPArribo.innerHTML = `Tiempo de Arribo: ${proceso.arribo}`

                //TIEMPO DE IRRUPCION
                let $tagPIrrupcion = document.createElement('p')
                $tagPIrrupcion.innerHTML = `Tiempo de Irrupcion: ${proceso.irrupcion}`

                //ESTADO
                let $tagPEstado = document.createElement('p')
                $tagPEstado.innerHTML = `Estado: ${proceso.estado}`

                //AGREGAMOS LOS ELEMENTOS A LA TARJETA
                $cardPanelProceso.appendChild($tagPNombre)
                $cardPanelProceso.appendChild($tagPDimension)
                $cardPanelProceso.appendChild($tagPArribo)
                $cardPanelProceso.appendChild($tagPIrrupcion)
                $cardPanelProceso.appendChild($tagPEstado)

                //AGREGAMOS LA TARJETA AL CONTENEDOR DE TARJETAS
                $listProcesosPanel.appendChild($cardPanelProceso)
            });

            $contProcesos.appendChild($listProcesosPanel)

            /***************************************************************************************************/
            //CONTENEDOR DE LA MEMORIA

            let $contMemoria = document.createElement('div')
            $contMemoria.setAttribute('class', 'card-panel contenedor-datos-memoria')

            //TITULO DEL DATO
            let $tituloDatosMemoria = document.createElement('h3')
            $tituloDatosMemoria.innerHTML = "Datos de la memoria"
            $contMemoria.appendChild($tituloDatosMemoria)

            //TAMAÑO DE LA MEMORIA
            let $tituloDimensionMemoria = document.createElement('p')
            $tituloDimensionMemoria.innerHTML = `Tamaño de la Memoria: ${dimensionMemoria}`
            $contMemoria.appendChild($tituloDimensionMemoria)

            //FRAGMENTACION DE LA MEMORIA
            let $tituloFragmentacionMemoria = document.createElement('p')
            $tituloFragmentacionMemoria.innerHTML = `Fragmentacion de la Memoria: ${fragMemoria}`
            $contMemoria.appendChild($tituloFragmentacionMemoria)

            //LISTA DE PARTICIONES
            let $listTarjetaParticion = document.createElement('div')
            $listTarjetaParticion.setAttribute('id', 'cont-particiones-panel')

            //CREAMOS LAS TARJETAS PARA LAS PARTICIONES
            arregloParticiones.forEach(function (particion) {

                //TARJETA PARA LA PARTICION
                let $tarjetaParticion = document.createElement('div')
                $tarjetaParticion.setAttribute('class', 'card-panel green lighten-3')

                //ID DE LA PARTICION
                let $tagPId = document.createElement('h5')
                $tagPId.innerHTML = `Particion ${particion.id}`

                //TAMAÑO DE LA PARTICION
                let $tagPDimension = document.createElement('p')
                $tagPDimension.innerHTML = `Tamaño: ${particion.dimension}`

                //FRAGMENTACION DE LA PARTICION
                let $tagPFragmentacion = document.createElement('p')
                $tagPFragmentacion.innerHTML = `Fragmentacion: ${particion.fragmentacion}`

                //ESTADO DE LA PARTICION
                let $tagPLibre = document.createElement('p')
                $tagPLibre.innerHTML = `Estado libre: ${particion.libre}`

                //PROCESO ACTUAL DE LA PARTICION
                let $tagPProcesoActual = document.createElement('p')
                $tagPProcesoActual.innerHTML = `Proceso actual: ${particion.procesoActual.nombre}`

                //AGREGAMOS LOS DATOS A LA TERJETA
                $tarjetaParticion.appendChild($tagPId)
                $tarjetaParticion.appendChild($tagPDimension)
                $tarjetaParticion.appendChild($tagPFragmentacion)
                $tarjetaParticion.appendChild($tagPLibre)
                $tarjetaParticion.appendChild($tagPProcesoActual)

                $listTarjetaParticion.appendChild($tarjetaParticion)

            });

            /************************************************************************************************************************************** */

            //CONTENEDOR COLA DE PROCESOS LISTOS
            let $contColaListos = document.createElement('div')
            $contColaListos.setAttribute('id', 'cola-de-procesos-listos')
            $contColaListos.setAttribute('class', 'card-panel contenedor-cola-listos')

            //TIUTULO COLA DE PROCESOS LISTOS
            let $tituloColaProcesosListos = document.createElement('h4')
            $tituloColaProcesosListos.innerHTML = "Cola de Procesos listos"
            $contColaListos.appendChild($tituloColaProcesosListos)

            //FILTRAR LOS PROCESO QUE ESTAN EN ESTADO DE LISTO 
            let arregloProcesosListos = arregloDeEstados[1].listaDeProcesos.filter(function (proceso) {
                return proceso.estado == "LISTO"
            })

            let $listaContProcListos = document.createElement('div')
            $listaContProcListos.setAttribute('id', 'contenedor-procesos-panel-listos')
            $listaContProcListos.setAttribute('class', 'materialize')

            arregloProcesosListos.forEach(function (proceso) {

                //CREAMOS LA TARJETA PARA CADA PROCESO
                let $cardPanelProceso = document.createElement('div')
                $cardPanelProceso.setAttribute('class', 'card-panel orange accent-2')

                //NOMBRE DEL PROCESO
                let $tagPNombre = document.createElement('h5')
                $tagPNombre.innerHTML = `${proceso.nombre}`

                //TAMAÑO DEL PROCESO
                let $tagPDimension = document.createElement('p')
                $tagPDimension.innerHTML = `Tamaño: ${proceso.dimension}`

                //TIEMPO DE ARRIBO
                let $tagPArribo = document.createElement('p')
                $tagPArribo.innerHTML = `Tiempo de Arribo: ${proceso.arribo}`

                //TIEMPO DE IRRUPCION
                let $tagPIrrupcion = document.createElement('p')
                $tagPIrrupcion.innerHTML = `Tiempo de Irrupcion: ${proceso.irrupcion}`

                //ESTADO
                let $tagPEstado = document.createElement('p')
                $tagPEstado.innerHTML = `Estado: ${proceso.estado}`

                //AGREGAMOS LOS ELEMENTOS A LA TARJETA
                $cardPanelProceso.appendChild($tagPNombre)
                $cardPanelProceso.appendChild($tagPDimension)
                $cardPanelProceso.appendChild($tagPArribo)
                $cardPanelProceso.appendChild($tagPIrrupcion)
                $cardPanelProceso.appendChild($tagPEstado)

                //AGREGAMOS LA TARJETA AL CONTENEDOR DE TARJETAS
                $listaContProcListos.appendChild($cardPanelProceso)
            });

            $contColaListos.appendChild($listaContProcListos)

            /**************************************************************************************************************************************/
            //CONTENEDOR DE LA CPU
            let $contCPU = document.createElement('div')
            $contCPU.setAttribute('class', 'card-panel contenedor-datos-cpu')

            //TITULO DE LOS DATOS DEL CPU                
            let $tituloDatosCPU = document.createElement('h3')
            $tituloDatosCPU.innerHTML = "Datos de la CPU"

            //TARJETA DEL CPU
            let $tarjetaCPU = document.createElement('div')
            $tarjetaCPU.setAttribute('class', 'card-panel red lighten-3')

            //AGREGAMOS LOS DATOS
            $tarjetaCPU.appendChild($cpuProcEje)

            $contCPU.appendChild($tituloDatosCPU)
            $contCPU.appendChild($tarjetaCPU)

            /***************************************************************************************************/
            //AGREGAMOS LOS DATOS
            $contMemoria.appendChild($listTarjetaParticion)
            $contenedorEventoEstado.appendChild($contProcesos)
            $contenedorEventoEstado.appendChild($contMemoria)
            $contenedorEventoEstado.appendChild($contColaListos)
            $contenedorEventoEstado.appendChild($contCPU)

            $contenedorDos.appendChild($contenedorEventoEstado)

        } else {

            if ((i > 1) && (i % 2 != 0)) {

                //CREAMOS EL TITULO DEL EVENTO
                let $tituloDelEvento = document.createElement('h4')
                $tituloDelEvento.innerHTML = arregloDeEstados[i - 1]
                $contenedorEventoEstado.appendChild($tituloDelEvento)

                /*************************************************DATOS DEL PROCESO*************************************************************/

                let $contenedorDatosProceso = document.createElement('div')
                $contenedorDatosProceso.setAttribute('class', 'card-panel contenedor-datos-proceso')

                //TITULO COLA DE PROCESOS LISTO Y SUSPENDIDOS
                let $tituloListoSuspendido = document.createElement('h4')
                $tituloListoSuspendido.innerHTML = "Cola de Procesos Listos y suspendido"
                $contenedorDatosProceso.appendChild($tituloListoSuspendido)

                //COLA DE LISTOS Y SUSPENDIDOS
                let $listaProcesoCardPanel = document.createElement('div')
                $listaProcesoCardPanel.setAttribute('id', 'lista-proceso-card-panel')

                //FILTRAMOS LOS PROCESOS LISTOS Y SUSPENDIDOS
                let arregloListoSuspendido = arregloDeEstados[i].listaDeProcesos.filter(function (proceso) {
                    return proceso.estado == "LISTO Y SUSPENDIDO"
                })

                arregloListoSuspendido.forEach(function (proceso) {
                    //CREAMOS LA TARJETA PARA CADA PROCESO
                    let $cardPanelProceso = document.createElement('div')
                    $cardPanelProceso.setAttribute('class', 'card-panel blue lighten-2')

                    //NOMBRE DEL PROCESO
                    let $tagPNombre = document.createElement('h5')
                    $tagPNombre.innerHTML = `${proceso.nombre}`

                    //TAMAÑO DEL PROCESO
                    let $tagPDimension = document.createElement('p')
                    $tagPDimension.innerHTML = `Tamaño: ${proceso.dimension}`

                    //TIEMPO DE ARRIBO
                    let $tagPArribo = document.createElement('p')
                    $tagPArribo.innerHTML = `Tiempo de Arribo: ${proceso.arribo}`

                    //TIEMPO DE IRRUPCION
                    let $tagPIrrupcion = document.createElement('p')
                    $tagPIrrupcion.innerHTML = `Tiempo de Irrupcion: ${proceso.irrupcion}`

                    //ESTADO
                    let $tagPEstado = document.createElement('p')
                    $tagPEstado.innerHTML = `Estado: ${proceso.estado}`

                    //AGREGAMOS LOS ELEMENTOS A LA TARJETA
                    $cardPanelProceso.appendChild($tagPNombre)
                    $cardPanelProceso.appendChild($tagPDimension)
                    $cardPanelProceso.appendChild($tagPArribo)
                    $cardPanelProceso.appendChild($tagPIrrupcion)
                    $cardPanelProceso.appendChild($tagPEstado)

                    //AGREGAMOS LA TARJETA AL CONTENEDOR DE TARJETAS
                    $listaProcesoCardPanel.appendChild($cardPanelProceso)
                })

                $contenedorDatosProceso.appendChild($listaProcesoCardPanel)

                /****************************************************************DATOS DE LA MEMORIA************************************************************************/

                let $contMemoria = document.createElement('div')
                $contMemoria.setAttribute('class', 'card-panel contenedor-datos-memoria')

                //TITULO DEL DATO
                let $tituloDatosMemoria = document.createElement('h3')
                $tituloDatosMemoria.innerHTML = "Datos de la memoria"
                $contMemoria.appendChild($tituloDatosMemoria)

                //TAMAÑO DE LA MEMORIA
                let $tituloDimensionMemoria = document.createElement('p')
                $tituloDimensionMemoria.innerHTML = `Tamaño de la Memoria: ${arregloDeEstados[i].memoria.dimension}`
                $contMemoria.appendChild($tituloDimensionMemoria)

                //FRAGMENTACION DE LA MEMORIA
                let $tituloFragmentacionMemoria = document.createElement('p')
                $tituloFragmentacionMemoria.innerHTML = `Fragmentacion de la Memoria: ${arregloDeEstados[i].memoria.fragmentacion}`
                $contMemoria.appendChild($tituloFragmentacionMemoria)

                //LISTA DE PARTICIONES
                let $listTarjetaParticion = document.createElement('div')
                $listTarjetaParticion.setAttribute('id', 'cont-particiones-panel')

                //CREAMOS LAS TARJETAS PARA LAS PARTICIONES
                arregloDeEstados[i].memoria.particiones.forEach(function (particion) {

                    //TARJETA PARA LA PARTICION
                    let $tarjetaParticion = document.createElement('div')
                    $tarjetaParticion.setAttribute('class', 'card-panel green lighten-3')

                    //ID DE LA PARTICION
                    let $tagPId = document.createElement('h5')
                    $tagPId.innerHTML = `Particion ${particion.id}`

                    //TAMAÑO DE LA PARTICION
                    let $tagPDimension = document.createElement('p')
                    $tagPDimension.innerHTML = `Tamaño: ${particion.dimension}`

                    //FRAGMENTACION DE LA PARTICION
                    let $tagPFragmentacion = document.createElement('p')
                    $tagPFragmentacion.innerHTML = `Fragmentacion: ${particion.fragmentacion}`

                    //ESTADO DE LA PARTICION
                    let $tagPLibre = document.createElement('p')
                    $tagPLibre.innerHTML = `Estado libre: ${particion.libre}`

                    //PROCESO ACTUAL DE LA PARTICION
                    let $tagPProcesoActual = document.createElement('p')
                    $tagPProcesoActual.innerHTML = `Proceso actual: ${particion.procesoActual.nombre}`

                    //AGREGAMOS LOS DATOS A LA TERJETA
                    $tarjetaParticion.appendChild($tagPId)
                    $tarjetaParticion.appendChild($tagPDimension)
                    $tarjetaParticion.appendChild($tagPFragmentacion)
                    $tarjetaParticion.appendChild($tagPLibre)
                    $tarjetaParticion.appendChild($tagPProcesoActual)

                    $listTarjetaParticion.appendChild($tarjetaParticion)

                });

                $contMemoria.appendChild($listTarjetaParticion)

                /************************************************************************************************************************************************************* */

                //CONTENEDOR COLA DE PROCESOS LISTOS
                let $contenedorColaProcesosListos = document.createElement('div')
                $contenedorColaProcesosListos.setAttribute('id', 'cola-de-procesos-listos')
                $contenedorColaProcesosListos.setAttribute('class', 'card-panel contenedor-cola-listos')

                //TIUTULO COLA DE PROCESOS LISTOS
                let $tituloColProcList = document.createElement('h4')
                $tituloColProcList.innerHTML = "Cola de Procesos listos"
                $contenedorColaProcesosListos.appendChild($tituloColProcList)

                //FILTRAR LOS PROCESO QUE ESTAN EN ESTADO DE LISTO 
                let arregloProcListos = arregloDeEstados[i].listaDeProcesos.filter(function (proceso) {
                    return proceso.estado == "LISTO"
                })

                let $listaContenedorProcListos = document.createElement('div')
                //$listaContenedorProcListos.setAttribute('id','cont-procesos-panel-listos')
                $listaContenedorProcListos.setAttribute('class', 'cont-procesos-panel-listos')

                arregloProcListos.forEach(function (proceso) {

                    //CREAMOS LA TARJETA PARA CADA PROCESO
                    let $cardPanelProceso = document.createElement('div')
                    $cardPanelProceso.setAttribute('class', 'card-panel orange accent-2')

                    //NOMBRE DEL PROCESO
                    let $tagPNombre = document.createElement('h5')
                    $tagPNombre.innerHTML = `${proceso.nombre}`

                    //TAMAÑO DEL PROCESO
                    let $tagPDimension = document.createElement('p')
                    $tagPDimension.innerHTML = `Tamaño: ${proceso.dimension}`

                    //TIEMPO DE ARRIBO
                    let $tagPArribo = document.createElement('p')
                    $tagPArribo.innerHTML = `Tiempo de Arribo: ${proceso.arribo}`

                    //TIEMPO DE IRRUPCION
                    let $tagPIrrupcion = document.createElement('p')
                    $tagPIrrupcion.innerHTML = `Tiempo de Irrupcion: ${proceso.irrupcion}`

                    //ESTADO
                    let $tagPEstado = document.createElement('p')
                    $tagPEstado.innerHTML = `Estado: ${proceso.estado}`

                    //AGREGAMOS LOS ELEMENTOS A LA TARJETA
                    $cardPanelProceso.appendChild($tagPNombre)
                    $cardPanelProceso.appendChild($tagPDimension)
                    $cardPanelProceso.appendChild($tagPArribo)
                    $cardPanelProceso.appendChild($tagPIrrupcion)
                    $cardPanelProceso.appendChild($tagPEstado)

                    //AGREGAMOS LA TARJETA AL CONTENEDOR DE TARJETAS
                    $listaContenedorProcListos.appendChild($cardPanelProceso)
                });

                $contenedorColaProcesosListos.appendChild($listaContenedorProcListos)

                /*******************************************************************DATOS DEL CPU******************************************************************************/
                //CONTENEDOR DE LA CPU
                let $contCPU = document.createElement('div')
                $contCPU.setAttribute('class', 'card-panel contenedor-datos-cpu')

                //TITULO DE LOS DATOS DEL CPU                
                let $tituloDatosCPU = document.createElement('h3')
                $tituloDatosCPU.innerHTML = "Datos de la CPU"

                //DATOS DE LA CPU
                let $cpuProcEje = document.createElement('p')
                $cpuProcEje.innerHTML = `Proceso Ejecutandose: ${arregloDeEstados[i].cpu.procesoEjecutando.nombre}`

                //TARJETA DEL CPU
                let $tarjetaCPU = document.createElement('div')
                $tarjetaCPU.setAttribute('class', 'card-panel red lighten-3')

                //AGREGAMOS LOS DATOS
                $tarjetaCPU.appendChild($cpuProcEje)

                $contCPU.appendChild($tituloDatosCPU)
                $contCPU.appendChild($tarjetaCPU)

                /************************************************************************************************************************************************************/
                //AGREGAMOS LOS DATOS
                $contenedorEventoEstado.appendChild($contenedorDatosProceso)
                $contenedorEventoEstado.appendChild($contMemoria)
                $contenedorEventoEstado.appendChild($contenedorColaProcesosListos)
                $contenedorEventoEstado.appendChild($contCPU)

                $contenedorDos.appendChild($contenedorEventoEstado)

            }

        }

    }

    //AGREGAR EL ULTIMO ESTADO
    let ultimoEstado = arregloDeEstados[arregloDeEstados.length - 1]

    //CREAMOS EL CONTENEDOR DEL EVENTO Y DEL ESTADO
    let $contenedorEventoEstado = document.createElement('div')
    $contenedorEventoEstado.setAttribute('class', 'blue darken-1 card-panel contenedor-evento-estado')

    //CREAMOS EL TITULO DEL EVENTO
    let $tituloDelEvento = document.createElement('h4')
    $tituloDelEvento.innerHTML = "Estado final de la simulación"
    $contenedorEventoEstado.appendChild($tituloDelEvento)

    /*************************************************DATOS DEL PROCESO*************************************************************/

    let $contenedorDatosProceso = document.createElement('div')
    $contenedorDatosProceso.setAttribute('class', 'card-panel contenedor-datos-proceso')

    //TITULO COLA DE PROCESOS LISTO Y SUSPENDIDOS
    let $tituloListoSuspendido = document.createElement('h4')
    $tituloListoSuspendido.innerHTML = "Cola de Procesos Listos y suspendido"
    $contenedorDatosProceso.appendChild($tituloListoSuspendido)

    //COLA DE LISTOS Y SUSPENDIDOS
    let $listaProcesoCardPanel = document.createElement('div')
    $listaProcesoCardPanel.setAttribute('id', 'lista-proceso-card-panel')

    //FILTRAMOS LOS PROCESOS LISTOS Y SUSPENDIDOS
    let arregloListoSuspendido = ultimoEstado.listaDeProcesos.filter(function (proceso) {
        return proceso.estado == "LISTO Y SUSPENDIDO"
    })

    arregloListoSuspendido.forEach(function (proceso) {
        //CREAMOS LA TARJETA PARA CADA PROCESO
        let $cardPanelProceso = document.createElement('div')
        $cardPanelProceso.setAttribute('class', 'card-panel blue lighten-2')

        //NOMBRE DEL PROCESO
        let $tagPNombre = document.createElement('h5')
        $tagPNombre.innerHTML = `${proceso.nombre}`

        //TAMAÑO DEL PROCESO
        let $tagPDimension = document.createElement('p')
        $tagPDimension.innerHTML = `Tamaño: ${proceso.dimension}`

        //TIEMPO DE ARRIBO
        let $tagPArribo = document.createElement('p')
        $tagPArribo.innerHTML = `Tiempo de Arribo: ${proceso.arribo}`

        //TIEMPO DE IRRUPCION
        let $tagPIrrupcion = document.createElement('p')
        $tagPIrrupcion.innerHTML = `Tiempo de Irrupcion: ${proceso.irrupcion}`

        //ESTADO
        let $tagPEstado = document.createElement('p')
        $tagPEstado.innerHTML = `Estado: ${proceso.estado}`

        //AGREGAMOS LOS ELEMENTOS A LA TARJETA
        $cardPanelProceso.appendChild($tagPNombre)
        $cardPanelProceso.appendChild($tagPDimension)
        $cardPanelProceso.appendChild($tagPArribo)
        $cardPanelProceso.appendChild($tagPIrrupcion)
        $cardPanelProceso.appendChild($tagPEstado)

        //AGREGAMOS LA TARJETA AL CONTENEDOR DE TARJETAS
        $listaProcesoCardPanel.appendChild($cardPanelProceso)
    })

    $contenedorDatosProceso.appendChild($listaProcesoCardPanel)

    /****************************************************************DATOS DE LA MEMORIA************************************************************************/

    let $contMemoria = document.createElement('div')
    $contMemoria.setAttribute('class', 'card-panel contenedor-datos-memoria')

    //TITULO DEL DATO
    let $tituloDatosMemoria = document.createElement('h3')
    $tituloDatosMemoria.innerHTML = "Datos de la memoria"
    $contMemoria.appendChild($tituloDatosMemoria)

    //TAMAÑO DE LA MEMORIA
    let $tituloDimensionMemoria = document.createElement('p')
    $tituloDimensionMemoria.innerHTML = `Tamaño de la Memoria: ${ultimoEstado.memoria.dimension}`
    $contMemoria.appendChild($tituloDimensionMemoria)

    //FRAGMENTACION DE LA MEMORIA
    let $tituloFragmentacionMemoria = document.createElement('p')
    $tituloFragmentacionMemoria.innerHTML = `Fragmentacion de la Memoria: ${ultimoEstado.memoria.fragmentacion}`
    $contMemoria.appendChild($tituloFragmentacionMemoria)

    //LISTA DE PARTICIONES
    let $listTarjetaParticion = document.createElement('div')
    $listTarjetaParticion.setAttribute('id', 'cont-particiones-panel')

    //CREAMOS LAS TARJETAS PARA LAS PARTICIONES
    ultimoEstado.memoria.particiones.forEach(function (particion) {

        //TARJETA PARA LA PARTICION
        let $tarjetaParticion = document.createElement('div')
        $tarjetaParticion.setAttribute('class', 'card-panel green lighten-3')

        //ID DE LA PARTICION
        let $tagPId = document.createElement('h5')
        $tagPId.innerHTML = `Particion ${particion.id}`

        //TAMAÑO DE LA PARTICION
        let $tagPDimension = document.createElement('p')
        $tagPDimension.innerHTML = `Tamaño: ${particion.dimension}`

        //FRAGMENTACION DE LA PARTICION
        let $tagPFragmentacion = document.createElement('p')
        $tagPFragmentacion.innerHTML = `Fragmentacion: ${particion.fragmentacion}`

        //ESTADO DE LA PARTICION
        let $tagPLibre = document.createElement('p')
        $tagPLibre.innerHTML = `Estado libre: ${particion.libre}`

        //PROCESO ACTUAL DE LA PARTICION
        let $tagPProcesoActual = document.createElement('p')
        $tagPProcesoActual.innerHTML = `Proceso actual: ${particion.procesoActual.nombre}`

        //AGREGAMOS LOS DATOS A LA TERJETA
        $tarjetaParticion.appendChild($tagPId)
        $tarjetaParticion.appendChild($tagPDimension)
        $tarjetaParticion.appendChild($tagPFragmentacion)
        $tarjetaParticion.appendChild($tagPLibre)
        $tarjetaParticion.appendChild($tagPProcesoActual)

        $listTarjetaParticion.appendChild($tarjetaParticion)

    });

    $contMemoria.appendChild($listTarjetaParticion)

    /*******************************************************************DATOS DEL CPU******************************************************************************/
    //CONTENEDOR DE LA CPU
    let $contCPU = document.createElement('div')
    $contCPU.setAttribute('class', 'card-panel contenedor-datos-cpu')

    //TITULO DE LOS DATOS DEL CPU                
    let $tituloDatosCPU = document.createElement('h3')
    $tituloDatosCPU.innerHTML = "Datos de la CPU"

    //DATOS DE LA CPU
    let $cpuProcEje = document.createElement('p')
    $cpuProcEje.innerHTML = `Proceso Ejecutandose: ${ultimoEstado.cpu}`

    //TARJETA DEL CPU
    let $tarjetaCPU = document.createElement('div')
    $tarjetaCPU.setAttribute('class', 'card-panel red lighten-3')

    $tarjetaCPU.appendChild($cpuProcEje)

    $contCPU.appendChild($tituloDatosCPU)
    $contCPU.appendChild($tarjetaCPU)

    /************************************************************************************************************************************************************/

    //AGREGAMOS LOS DATOS
    $contenedorEventoEstado.appendChild($contenedorDatosProceso)
    $contenedorEventoEstado.appendChild($contMemoria)
    $contenedorEventoEstado.appendChild($contCPU)

    $contenedorDos.appendChild($contenedorEventoEstado)

    function recargar() {
        location.reload()
    }

    let $botonRecargar = document.createElement('input')
    $botonRecargar.setAttribute('class','btn blue darken-3')
    $botonRecargar.setAttribute('type','button')
    $botonRecargar.setAttribute('value','Volver a simular')
    $botonRecargar.addEventListener('click',recargar)
    $contenedorDos.appendChild($botonRecargar)

    //AGREGAMOS EL CONTENEDOR DEL SIMULADOR AL CONTENEDOR PRINCIPAL
    $contenedorPrincipal.appendChild($contenedorDos)
}
