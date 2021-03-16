/*********** OBJETO MEMORIA ***********/
function Memoria() {
    this.particiones
    this.dimension
    this.fragmentacion
}


/*********** OBJETO PARTICION ***********/
function Particion() {
    this.id
    this.dimension
    this.libre
    this.fragmentacion
    this.procesoActual
}

/*********** OBJETO PROCESO ***********/
function Proceso() {
    this.nombre = "NO HAY PROCESOS"
    this.dimension
    this.estado
    this.arribo
    this.irrupcion
    this.tControl
}


/*********** OBJETO CPU ***********/
function Cpu() {
    this.procesoEjecutando
}
