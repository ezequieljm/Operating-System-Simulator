/* ESTO PROYECTO LLEVA 2088 LINEAS DIVIDIDOS EN  11 MODULOS*/

//HACEMOS UN LLAMADA A LA INTERFACE DE USUARIO PARA EL INGRESO DE LOS DATOS
//ELECION SOBRE SI LOS PROCESOS SE INGRESAN POR TECLADO O SE GENERAN DE FORMA ALEATORIA

//CREAMOS UNA VARIABLE LLAMADA random QUE NOS SIRVE PARA IDENTIFICAR SI EL SIMULADOR SERA EJECUTADO 
//DE FORMA ALEATORIA O POR INGRESO DE DATOS. SI random ES IGUAL A "aleatorio" SE EJECUTA EL SIMULADOR
//ALEATORIO. SI ES "manual" SE EJECUTA EL SIMULADOR POR INGRESO DE DATOS.
let random = "sin Valor"

//DEFINIMOS OTRA VARIABLE LLAMADA estadosDeSimlacion EN DONDE SE GUARDA TODA LA SIMULACION COMPLETA
let estadosDeSimulacion = []

//EN EL CASO DE QUE EL SIMULADOR SE EJECUTE DE FORMA MANUAL, CREAMOS LAS SIGUIENTES VARIABLES
//LISTA DE PROCESOS INGRESADO POR EL USUARIO
let listaProcesosUsuario = []

//GENERAMOS UN NUEVO OBJETO KERNEL 
let nuevoKernel = new Kernel()

//FUNCION PARA AGREGAR Y MOSTRAR LOS PROCESOS INGRESADOS POR EL USUARIO. ES LLAMADA POR EL BOTON $agregar
function agregarYMostrarProceso() {

    let $contProcesos = document.getElementById('contenedor-procesos')

    //CAPTURAMOS LA INFORMACION DEL FORMULARIO
    //DEBEMOS CONTROLAR QUE EL USUARIO NO INGRESE UN PROCESO CUYO TAMAÑO SEA MAYOR A 250
    let $dimension = document.getElementById('dimension').value
    let $nomProc = document.getElementById('nombre-proceso').value
    let $arribo = document.getElementById('arribo').value
    let $irrupcion = document.getElementById('irrupcion').value
    
    //PRIMERO CONTROLAMOS SI EXISTEN DATOS INCLOMPLETOS
    if ($nomProc == '') {
        alert("EXISTEN CAMPOS INCOMPLETOS: NOMBRE DEL PROCESO")
    } else {
        if ($dimension == '') {
            alert("EXISTEN CAMPOS INCOMPLETOS: TAMAÑO DEL PROCESO")
        } else {
            if ($arribo == '') {
                alert("EXISTEN CAMPOS INCOMPLETOS: TIEMPO DE ARRIBO")
            } else {
                if ($irrupcion == '') {
                    alert("EXISTEN CAMPOS INCOMPLETOS: TIEMPO DE IRRUPCION")
                } else {
                    if (Number($dimension) > 250) {
                        alert("TAMAÑO DEL PROCESO NO VALIDO: EL TAMAÑO ES MAYOR A 250")
                    } else {
                        if (Number($dimension) < 0) {
                            alert("TAMAÑO DEL PROCESO NO VALIDO: EL TAMAÑO ES MENOR A 30")
                        } else {
                            //CREAMOS UN OBJETO DEL TIPO PROCESO EN DONDE GUARDAMOS LOS DATOS
                            let nuevoProceso = new Proceso()
                            nuevoProceso.nombre = $nomProc
                            nuevoProceso.dimension = Number($dimension)
                            nuevoProceso.arribo = Number($arribo)
                            nuevoProceso.irrupcion = Number($irrupcion)
                            nuevoProceso.estado = "EN EL DISCO"
                            nuevoProceso.tControl = 0

                            //LLAMOS A LA FUNCION cardPanelProcesos() PARA RENDERIZAR LA TARJETA DEL PROCESO
                            let $tarjetaProc = cardPanelProcesos(nuevoProceso)
                            $contProcesos.appendChild($tarjetaProc)

                            //AGREGAMOS EL PROCESO A LA LISTA DE PROCESOS INGRESADOS POR EL USUARIO
                            listaProcesosUsuario.push(nuevoProceso)
                            nuevoKernel.listaDeProcesos = listaProcesosUsuario   
                        }   

                    }
                            
                }               

            }
                
        }
            
    }

}

//FUNCION PARA RENDERIZAR LA SIMULACION. ES LLAMADA POR EL BOTON $iniciar
function renderizarSimulacion() {
    let $contenedorPrincipal = document.getElementById('contenedor-principal')
    $contenedorPrincipal.innerHTML = ''

    //CONTROLAMOS EL BOTON INICIAR 
    if (nuevoKernel.listaDeProcesos.length == 0) {
        alert("NO PUEDE INICIAR LA SIMULACION SIN HABER AGREGADO AL MENOS UN PROCESO")
        //LLAMAR A RANDOM 2
        llamadaModoManualControlado()
    } else {
        //LLAMAMOS A LA FUNCION PARA RENDERIZAR EL SIMULADOR Y ADEMAS CALCULAR LOS ESTADOS
        //renderizarInterface()
        nuevoKernel.particionar()
        estadosDeSimulacion = simularProcesosDeUsuario(nuevoKernel)
        console.log(estadosDeSimulacion)
        interfaceSimulador(estadosDeSimulacion)   
        
    }
    
    //AQUI DEBEMOS LLAMAR A LA FUNCION PARA RENDERIZAR EL SIMULADOR
}

//RECARGAR LA PAGINA DESDE EL MODO MANUAL
function recargar(holaMundo) {
    location.reload()
}

//LA FUNCION llamadaARandom() COMPRUEBA EL ESTADO DE LA VARIABLE RANDOM Y EJECUTA EL SIMULADOR CORRESPONDIENTE
function llamadaARandom() {

    if (random == "aleatorio") {
        //SE EJECUTA EL SIMULADOR CON PROCESOS GENERADOS DE FORMA ALEATORIA
        alert("NOTA:\n\nEl modo Aleatorio genera una simulación con una cierta cantidad de procesos (10 procesos por defecto).\n\nLos procesos tienen un tamaño entre 30 a 250 unidades.\nEl tiempo de arribo es de 0 a 10.\nEl tiempo de irrupción es de 3 a 10.")
        let $contenedorPrincipal = document.getElementById('contenedor-principal')
        $contenedorPrincipal.innerHTML = ""
        estadosDeSimulacion = simularProcesosAleatorios()
        console.log(estadosDeSimulacion)
        interfaceSimulador(estadosDeSimulacion)



        //AQUI DEBEMOS LLAMAR A LA FUNCION PARA RENDERIZAR EL SIMULADOR

    } else {
        //SE EJECUTA EL SIMULADOR CON PROCESOS INGRESADOS POR EL USUARIO
        let $formularioYProcesos = formularioProceso()
        let $contenedorPrincipal = document.getElementById('contenedor-principal')
        $contenedorPrincipal.innerHTML = ""
        $contenedorPrincipal.appendChild($formularioYProcesos)

        //EVENTO PARA AÑADIR PROCESOS ESTA A LA ESCUCHA DE QUE SUCEDA EL EVENTO
        let $agregar = document.getElementById('agregar')
        $agregar.addEventListener('click', agregarYMostrarProceso)

        //EVENTO PARA INICIAR LA SIMULACION ESTA A LA ESCUCHA DE QUE SUCEDA EL EVENTO
        let $botonIniciar = document.getElementById('simular')
        $botonIniciar.addEventListener('click', renderizarSimulacion)

        //EVENTO PARA VOLVER ATRAS
        let $botonRecargar= document.getElementById('boton-recargar')
        $botonRecargar.addEventListener('click',recargar)

    }

}

function llamadaModoManualControlado() {
    //SE EJECUTA EL SIMULADOR CON PROCESOS INGRESADOS POR EL USUARIO
    let $formularioYProcesos = formularioProceso()
    let $contenedorPrincipal = document.getElementById('contenedor-principal')
    $contenedorPrincipal.innerHTML = ""
    $contenedorPrincipal.appendChild($formularioYProcesos)

    //EVENTO PARA AÑADIR PROCESOS ESTA A LA ESCUCHA DE QUE SUCEDA EL EVENTO
    let $agregar = document.getElementById('agregar')
    $agregar.addEventListener('click', agregarYMostrarProceso)

    //EVENTO PARA INICIAR LA SIMULACION ESTA A LA ESCUCHA DE QUE SUCEDA EL EVENTO
    let $botonIniciar = document.getElementById('simular')
    $botonIniciar.addEventListener('click', renderizarSimulacion)

    //EVENTO PARA VOLVER ATRAS
    let $botonRecargar= document.getElementById('boton-recargar')
    $botonRecargar.addEventListener('click',recargar)
}


function seleccionDeModo() {
    //ESTO DEVUELVE UN ARREGLO CON LOS INPUTS TIPO RADIO
    let arregloDeRadios = document.querySelectorAll('input')

    //DEBEMOS BUSCAR EN EN EL ARREGLO DE LOS INPUTS RADIO AQUEL QUE TENGA EL ATRIBUTO checked
    for (let i = 0; i < arregloDeRadios.length; i++) {
        if (arregloDeRadios[i].checked) {
            //UNA VEZ IDENTIFICADO CUAL ES EL INPUT RADIO QUE TIENE EL ATRIBUTO checked, OBTENEMOS SU VALOR
            random = arregloDeRadios[i].value

            //LLAMAMOS A LA FUNCION llamadaARandom()
            llamadaARandom()
            break
        }
    }
}

//BOTON QUE ESTA A LA ESCUCHA DEL EVENTO SELECCIONA MODO
let $botonOK = document.getElementById('boton-ok')
$botonOK.addEventListener('click', seleccionDeModo)


function myFunction(name, lastname){
    console.log(name)
    console.log(lastname)
}


