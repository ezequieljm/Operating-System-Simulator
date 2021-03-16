/* OBJETO PRINCIPAL KERNEL

    El Kernel es un objeto que posee tres propiedades, memoria, listaDeProcesos y cpu. Estas propiedades a su vez son
    objetos definidos en abs.js que representan una abstruaccion de los componentes del sistema operativo.

*/

function Kernel() {
    this.memoria
    this.listaDeProcesos = []
    this.cpu
}

/* 
    El metodo generar() se utiliza durante el testeo del simulador. Su principal funcion es crear los procesos y las
    particiones. Los procesos las genera de manera aleatoria. El metodo establece las propiedades del Kernel
*/
Kernel.prototype.generar = function () {
    let arr = []
    let memoria = new Memoria()

    let partUno = new Particion()
    partUno.id = 0
    partUno.dimension = 100
    partUno.libre = false
    partUno.fragmentacion = 0
    partUno.procesoActual = "Sistema Operativo"

    arr.push(partUno)

    let particionDos = new Particion()
    particionDos.id = 1
    particionDos.dimension = 250
    particionDos.libre = true
    particionDos.fragmentacion = 0
    particionDos.procesoActual = "SIN ASIGNAR"
    arr.push(particionDos)

    let particionTres = new Particion()
    particionTres.id = 2
    particionTres.dimension = 120
    particionTres.libre = true
    particionTres.fragmentacion = 0
    particionTres.procesoActual = "SIN ASIGNAR"
    arr.push(particionTres)

    let pariticionCuatro = new Particion()
    pariticionCuatro.id = 3
    pariticionCuatro.dimension = 60
    pariticionCuatro.libre = true
    pariticionCuatro.fragmentacion = 0
    pariticionCuatro.procesoActual = "SIN ASIGNAR"
    arr.push(pariticionCuatro)

    memoria.particiones = arr
    memoria.dimension = arr[0].dimension + arr[1].dimension + arr[2].dimension + arr[3].dimension
    memoria.fragmentacion = 0

    this.memoria = memoria

    let arrProc = []

    for (let i = 0; i < 10; i++) {
        let proceso = new Proceso()
        proceso.nombre = `Proceso ${i}`
        proceso.dimension = Math.floor(Math.random() * 220 + 30)
        proceso.arribo = Math.floor(Math.random() * 9)
        proceso.irrupcion = Math.floor(Math.random() * 10 + 2)
        proceso.estado = "EN EL DISCO"
        proceso.tControl = 0

        arrProc.push(proceso)
    }

    this.listaDeProcesos = arrProc
    this.cpu = new Cpu()
    this.cpu.procesoEjecutando = new Proceso()
}

/* 

    El metodo clonar, crea una copia del objeto kernel. Se utiliza para evitar la modificacion de datos 

*/


/* 
    Algoritmo sjf(). La propiedad listaDeProcesos es un arreglo de objetos tipo Procesos, este algoritmo
    ordena este arreglo por tiempo de irrupcion de los procesos. NOTA: Este algoritmo ordena el arreglo sin 
    importar el estado de los procesos
*/
Kernel.prototype.sjf = function () {
    this.listaDeProcesos.sort(function (a, b) {
        return a.irrupcion - b.irrupcion
    })
}


/* 
    Algoritmo best-fit: Es una funcion que recibe como parametro un arreglo de particiones cuyo estado libre es true y 
    el proceso a ser asignado. Se crea un arreglo para el proceso en donde se almacena la fragmentaciones del proceso con 
    cada una de las particiones de la listaDeParticionesLibres. Luego, esta lista es ordenada de menor a mayor, como puede haber
    fragmentacion negativa (es el caso en que el tamaño de la particion sea inferior al del proceos, la operacion 
    es tamañoDeParticion - tamañoDeProceso) se asigna en la primera que encuentre mayor o igual a 0 
*/

function bestFit(listaDeParticionesLibres, proceso) {
    let arrFrag = []

    listaDeParticionesLibres.forEach(function (particion) {
        let objPart = {
            idPart: particion.id,
            fragmentacion: particion.dimension - proceso.dimension
        }
        arrFrag.push(objPart)
    })

    arrFrag.sort(function (a, b) {
        return a.fragmentacion - b.fragmentacion
    })

    if (arrFrag.some(function (obj) {return obj.fragmentacion >= 0})) {
        let ix = arrFrag.findIndex(function (objPart) {
            return objPart.fragmentacion >= 0
        })

        listaDeParticionesLibres.forEach(function (particion) {
            if (particion.id == arrFrag[ix].idPart) {
                particion.procesoActual = proceso
                particion.libre = false
                particion.fragmentacion = arrFrag[ix].fragmentacion

                proceso.estado = "LISTO"
            }
        })

    }

}


function clonar(objeto) {

    let mem__proto__ = new Memoria()
    let part__proto__ = new Particion()
    let proc__proto__ = new Proceso()
    let cpu__proto__ = new Cpu()

    /* CLONAMOS LOS DATOS */

    let copia = JSON.parse(JSON.stringify(objeto))

    Object.setPrototypeOf(copia, objeto)

    Object.setPrototypeOf(copia.memoria, mem__proto__)

    Object.setPrototypeOf(copia.cpu, cpu__proto__)

    Object.setPrototypeOf(copia.cpu.procesoEjecutando, proc__proto__)

    copia.memoria.particiones.forEach(function (particion) {
        Object.setPrototypeOf(particion, part__proto__)
    })

    copia.memoria.particiones.forEach(function (particion) {
        if (particion.procesoActual != "Sistema Operativo") {
            Object.setPrototypeOf(particion.procesoActual, proc__proto__)
        }
    })

    copia.listaDeProcesos.forEach(function (proceso) {
        Object.setPrototypeOf(proceso, proc__proto__)
    })


    return copia
}


Kernel.prototype.particionar = function () {
    let arr = []
    let memoria = new Memoria()

    let partUno = new Particion()
    partUno.id = 0
    partUno.dimension = 100
    partUno.libre = false
    partUno.fragmentacion = 0
    partUno.procesoActual = "Sistema Operativo"

    arr.push(partUno)

    let particionDos = new Particion()
    particionDos.id = 1
    particionDos.dimension = 250
    particionDos.libre = true
    particionDos.fragmentacion = 0
    particionDos.procesoActual = "SIN ASIGNAR"
    arr.push(particionDos)

    let particionTres = new Particion()
    particionTres.id = 2
    particionTres.dimension = 120
    particionTres.libre = true
    particionTres.fragmentacion = 0
    particionTres.procesoActual = "SIN ASIGNAR"
    arr.push(particionTres)

    let pariticionCuatro = new Particion()
    pariticionCuatro.id = 3
    pariticionCuatro.dimension = 60
    pariticionCuatro.libre = true
    pariticionCuatro.fragmentacion = 0
    pariticionCuatro.procesoActual = "SIN ASIGNAR"
    arr.push(pariticionCuatro)

    memoria.particiones = arr
    memoria.dimension = arr[0].dimension + arr[1].dimension + arr[2].dimension + arr[3].dimension
    memoria.fragmentacion = 0

    this.memoria = memoria

    //let arrProc = []

    //for (let i = 0; i < 3; i++) {
    //    let proceso = new Proceso()
    //    proceso.nombre = `Proceso ${i}`
    //    proceso.dimension = Math.floor(Math.random() * 220 + 30)
    //    proceso.arribo = Math.floor(Math.random() * 9)
    //    proceso.irrupcion = Math.floor(Math.random() * 10 + 2)
    //    proceso.estado = "EN EL DISCO"
    //    proceso.tControl = 0

    //    arrProc.push(proceso)
    //}

    //this.listaDeProcesos = arrProc

    this.cpu = new Cpu()
    this.cpu.procesoEjecutando = new Proceso()
}
