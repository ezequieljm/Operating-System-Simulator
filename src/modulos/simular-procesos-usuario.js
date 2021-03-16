function simularProcesosDeUsuario(obj) {
    //CREAR EL OBJETO KERNEL
    //let objetoKernel = new Kernel()

    //CREAMOS LA LISTA DE ESTADOS A RETORNAR
    let listaDeEstados = []

    //GENERAMOS LAS PRUEBAS ALEATORIAS
    //objetoKernel.generar()

    //GENERAMOS UN COPIA PERO EN EL CASO DE QUE SEA UNA SIMULACION POR GENERACION ALEATORIA DE PROCESOS
    //let copiaDeKernel = clonar()

    //GENERAMOS UNA COPIA DEL objetoKernel. SIEMPRE TRABAJAMOS SOBRE LA COPIA, NO SOBRE EL OBJETO ORIGINAL
    let copiaDeKernel = clonar(obj)

    //AGREGAMOS LA COPIA COMO PRIMER ELEMENTO DE LA LISTA DE ESTADOS
    let estadoInicial = "Estado inicial del simulador"
    listaDeEstados.push(estadoInicial)
    listaDeEstados.push(copiaDeKernel)

    //DEFINIMOS LOS TIEMPOS, TIEMPO TOTAL DE LA SIMULACION SERÁ LA SUMA DE TODOS LOS TIEMPOS DE IRRUPCION DE LOS PROCESOS
    let tiempoTotal = 0

    copiaDeKernel.listaDeProcesos.forEach(function (proceso) {
       tiempoTotal = tiempoTotal + proceso.irrupcion 
    })

    //ALGORITMO PRINCIPAL
    let arribo 

    //DEBEMOS BUSCAR EL TIEMPO DE ARRIBO MENOR ENTRE TODOS LOS PROCESO, SI HAY PROCESOS QUE TIENE EL MISMO TIEMPO DE ARRIBO MENOR DA IGUAL.
    let tiemposDeArribo = [] //PRIMERO ARMAMOS UN ARREGLO CON LOS TIEMPOS DE ARRIBOS DE LOS PROCESOS
    copiaDeKernel.listaDeProcesos.forEach(function (proceso){
        tiemposDeArribo.push(proceso.arribo)
    });

    //AHORA BUSCAMOS EL MENOR TIEMPO DE ARRIBO DEL ARREGLO Y A PARTIR DE ESE TIEMPO EMPIEZA EL ALGORITMO
    let arriboMin = Math.min(...tiemposDeArribo)

    for (let tiempo = arriboMin; tiempo < tiempoTotal; tiempo++) {

        //COMO SIEMPRE EMPIEZA EN EL TIEMPO DE ARRIBO MENOR, SIEMPRE VA A TENER UN PROCESO EJECUTANDOCE AL FINAL DEL PRIMER CICLO DEL FOR
        if(tiempo != arriboMin){

            //TENEMOS QUE CONTROLAR SI HAY PROCESOS QUE ARRIBEN EN ESTE TIEMPO Y ADEMAS SI EL PROCESO QUE SE ESTA EJECUTANDO HA TERMINADO
            //CONTROLAMOS SI HAY ARRIBOS DE PROCESOS
            let siArribo = copia.listaDeProcesos.some(function (proceso){
                return proceso.arribo == tiempo
            })

            if (siArribo && tiempo == copia.cpu.procesoEjecutando.tControl) {
                //EN ESTE CASO TENEMOS QUE HAN ARRIBADO PROCESOS Y TAMBIEN EL PROCESO QUE SE ESTA EJECUTANDO EN EL CPU YA TERMINO SU TIEMPO DE IRRUPCION

                //PRIMERO DEBEMOS SACAR EL PROCESO DE LA CPU (CAMBIARLE EL ESTADO A TERMINADO)
                copia.cpu.procesoEjecutando.estado = "TERMINADO"

                //TAMBIEN DEBEMOS CAMBIAR EL ESTADO DEL PROCESO EN LA LISTA DE PROCESOS 
                copia.listaDeProcesos.forEach(function (proceso){
                    if (proceso.nombre == copia.cpu.procesoEjecutando.nombre) {
                        proceso.estado = "TERMINADO"
                    }
                });

                //DEBEMOS QUITAR EL PROCESO DE LA MEMORIA (ASIGNAR A LA PARTICION DONDE ESTA EL PROCESO COMO LIBRE)
                copia.memoria.particiones.forEach(function (particion){
                    if(particion.procesoActual.nombre == copia.cpu.procesoEjecutando.nombre){
                        particion.libre = true
                        particion.procesoActual = "SIN ASIGNAR"
                        particion.fragmentacion = 0
                    }
                });

                //DEBEMOS CARGAR LOS PROCESOS QUE ARRIBARON EN ESTE TIEMPO A LA MEMORIA
                copia.listaDeProcesos.forEach(function (proceso){
                    if(proceso.arribo == tiempo){
                        proceso.estado = "LISTO Y SUSPENDIDO"
                    }
                })

                //APLICAMOS EL ALGORITMO DE BEST-FIT YA COMO SABEMOS QUE ES EL QUE ES EL PRIMER PROCESO O PROCESOS EN ARRIBAR Y LAS PARTICIONES ESTAN TODAS LIBRES
                copia.listaDeProcesos.forEach(function (proceso){
                    if (proceso.estado == 'LISTO Y SUSPENDIDO') {
                        let particionesLibres = copia.memoria.particiones.filter(function (particion) {
                            return particion.libre === true
                        })
                        
                        if (particionesLibres != 0) {
                            bestFit(particionesLibres, proceso)
                            //SI EL PROCESO PUEDE SER ASIGNADO, EL PROPIO ALGORITMO BEST-FIT YA CAMBIA SU ESTADO A LISTO, DE LO CONTRARIO PERMANECE LISTO Y SUSPENDIDO
                        }   
                    }

                });   

                //CALCULAMOS LA FRAGMENTACION TOTAL DE LA MEMORIA
                let totalFragment = 0
                copia.memoria.particiones.forEach(function (particion){
                    totalFragment = totalFragment + particion.fragmentacion
                });
                copia.memoria.fragmentacion = totalFragment

                //AGREGAR EL PROCESO A LA CPU
                let colaListos = copia.listaDeProcesos.filter(function (proceso){
                    return proceso.estado == "LISTO"
                })

                copia.cpu.procesoEjecutando = colaListos[0]
                copia.cpu.procesoEjecutando.estado = "EJECUTANDO"

                //EL TIEMPO DE CONTROL tControl ES UN PARAMETRO QUE SOLO ES NECESARIO PARA LA IMPLEMENTACION DEL ALGORITMO
                copia.cpu.procesoEjecutando.tControl = tiempo + copia.cpu.procesoEjecutando.irrupcion

                //COLOCAMOS UNA VARIABLE QUE NOS INDICA EL EVENTO QUE OCURRE
                let evento = `ARRIBO DE PROCEOS Y EL PROCESO QUE SE ESTA EJECUTANDO EN EL CPU HA TERMINADO. TIEMPO ${tiempo}`
                listaDeEstados.push(evento)

                //COLOCAMOS LA COPIA EN LA LISTA DE ESTADOS 
                listaDeEstados.push(copia)   

            } else {
                if (tiempo == copia.cpu.procesoEjecutando.tControl) {
                    //EN ESTE CASO PUEDO NO HABER ARRIBO O EL PROCESO QUE SE ESTA EJECUTANDO NO HA TERMINADO, PREGUNTAMOS PRIMERO POR LA SEGUNDA CONDICION
                    
                    //TENEMOS QUE SACAR EL PROCESO DE LA CPU Y LA MEMORIA (CAMBIAR SU ESTADO A TERMIANDO)
                    copia.cpu.procesoEjecutando.estado = "TERMINADO"

                    //TAMBIEN DEBEMOS CAMBIAR EL ESTADO DEL PROCESO EN LA LISTA DE PROCESOS 
                    copia.listaDeProcesos.forEach(function (proceso){
                        if (proceso.nombre == copia.cpu.procesoEjecutando.nombre) {
                            proceso.estado = "TERMINADO"
                        }
                    });

                    //DEBEMOS QUITAR EL PROCESO DE LA MEMORIA (ASIGNAR A LA PARTICION DONDE ESTA EL PROCESO COMO LIBRE)
                    copia.memoria.particiones.forEach(function (particion){
                        if(particion.procesoActual.nombre == copia.cpu.procesoEjecutando.nombre){
                            particion.libre = true
                            particion.procesoActual = "SIN ASIGNAR"
                            particion.fragmentacion = 0
                        }
                    });

                    //EL PROBLEMA QUE PUEDE SURGIR ES QUE UN PROCESO PUEDE TERMINAR DE EJECUTARCE Y NO HABER NINGUN OTRO PROCESO CARGADO EN LA MEMORIA
                    //PORQUE AUN NO HAN ARRIBADO NINGUNO, POR TANTO NO VAN A HABER PROCESOS LISTO Y SUSPENDIDOS
                    //DEBEMOS PREGUNTAR SI HAY PROCESOS EN ESTADO LISTO Y SUSPENDIDO PARA CARGAR UN PROCESO AL CPU
                    //EN CASO CONTRARIO, SOLO DEVOLVEMOS UNA COPIA DEL ESTADO
                    let listYSuspendido = copia.listaDeProcesos.some(function (proceso){
                        return proceso.estado == "LISTO Y SUSPENDIDO"
                    })
                        
                    if (listYSuspendido) {

                        //DEBEMOS CARGAR UN PROCESO LISTO Y SUSPENDIDO EN LA PARTICION LIBRE
                        copia.listaDeProcesos.forEach(function (proceso){
                            if (proceso.estado == 'LISTO Y SUSPENDIDO') {
                                let particionesLibres = copia.memoria.particiones.filter(function (particion) {
                                    return particion.libre === true
                                })
                                
                                if (particionesLibres != 0) {
                                    bestFit(particionesLibres, proceso)
                                }   

                                //CALCULAMOS LA FRAGMENTACION TOTAL DE LA MEMORIA
                                let totalFragment = 0
                                copia.memoria.particiones.forEach(function (particion){
                                    totalFragment = totalFragment + particion.fragmentacion
                                });
                                copia.memoria.fragmentacion = totalFragment

                            }
                        });

                        //DEBEMOS CARGAR EL NUEVO PROCESO A LA CPU
                        let colaListos = copia.listaDeProcesos.filter(function (proceso){
                            return proceso.estado == "LISTO"
                        })

                        copia.cpu.procesoEjecutando = colaListos[0]
                        copia.cpu.procesoEjecutando.estado = "EJECUTANDO"

                        //EL TIEMPO DE CONTROL tControl ES UN PARAMETRO QUE SOLO ES NECESARIO PARA LA IMPLEMENTACION DEL ALGORITMO
                        copia.cpu.procesoEjecutando.tControl = tiempo + copia.cpu.procesoEjecutando.irrupcion   
                        
                    }else{

                        let siListo = copia.listaDeProcesos.some(function (proceso){
                            return proceso.estado == "LISTO"
                        })

                        //CALCULAMOS LA FRAGMENTACION TOTAL DE LA MEMORIA. EN CUALQUIER CASO SOLO HAY QUE SACAR ESTA PARTE EN DONDE SE CALCULA LA FRAGMENTACION
                        let totalFragment = 0
                        copia.memoria.particiones.forEach(function (particion){
                            totalFragment = totalFragment + particion.fragmentacion
                        });
                        copia.memoria.fragmentacion = totalFragment

                        if (siListo) {
                            //DEBEMOS CARGAR EL NUEVO PROCESO A LA CPU
                            let colaListos = copia.listaDeProcesos.filter(function (proceso){
                                return proceso.estado == "LISTO"
                            })

                            copia.cpu.procesoEjecutando = colaListos[0]
                            copia.cpu.procesoEjecutando.estado = "EJECUTANDO"

                            //EL TIEMPO DE CONTROL tControl ES UN PARAMETRO QUE SOLO ES NECESARIO PARA LA IMPLEMENTACION DEL ALGORITMO
                            copia.cpu.procesoEjecutando.tControl = tiempo + copia.cpu.procesoEjecutando.irrupcion      
                        }

                    }

                    //COLOCAMOS UNA VARIABLE QUE NOS INDICA EL EVENTO QUE OCURRE
                    let evento = `EL PROCESO QUE SE ESTA EJECUTANDO EN EL CPU HA TERMINADO. TIEMPO ${tiempo}`
                    listaDeEstados.push(evento)

                    //COLOCAMOS LA COPIA EN LA LISTA DE ESTADOS 
                    listaDeEstados.push(copia)   

                } else {
                    
                    if (siArribo) {
                        //SOLO PROCESOS QUE ARRIBAN
                        copia.listaDeProcesos.forEach(function (proceso){
                            if(proceso.arribo == tiempo){
                                proceso.estado = "LISTO Y SUSPENDIDO"
                            }
                        })

                        //APLICAMOS EL ALGORITMO DE BEST-FIT YA COMO SABEMOS QUE ES EL QUE ES EL PRIMER PROCESO O PROCESOS EN ARRIBAR Y LAS PARTICIONES ESTAN TODAS LIBRES
                        copia.listaDeProcesos.forEach(function (proceso){
                            if (proceso.estado == 'LISTO Y SUSPENDIDO') {
                                let particionesLibres = copia.memoria.particiones.filter(function (particion) {
                                    return particion.libre === true
                                })
                                
                                if (particionesLibres != 0) {
                                    bestFit(particionesLibres, proceso)
                                }   

                                //CALCULAMOS LA FRAGMENTACION TOTAL DE LA MEMORIA
                                let totalFragment = 0
                                copia.memoria.particiones.forEach(function (particion){
                                    totalFragment = totalFragment + particion.fragmentacion
                                });
                                copia.memoria.fragmentacion = totalFragment

                            }

                        });   

                        //COLOCAMOS UNA VARIABLE QUE NOS INDICA EL EVENTO QUE OCURRE
                        let evento = `SOLO HAY ARRIBOS DE PROCESOS. TIEMPO ${tiempo}`
                        listaDeEstados.push(evento)

                        //COLOCAMOS LA COPIA EN LA LISTA DE ESTADOS 
                        listaDeEstados.push(copia)    
                    }
                      
                }
            }
            
        }else{

            //EN ESTE ELSE ES DONDE VA A ENTRAR LA PRIMERA VEZ QUE TENGA UNO O MÁS PROCESOS CON TIEMPO DE ARRBIO MINIMO

            //GENERAMOS UNA COPIA DE copiaDeKernel
            copia = clonar(copiaDeKernel)

            copia.listaDeProcesos.forEach(function (proceso){
                if(proceso.arribo == tiempo){
                    proceso.estado = "LISTO Y SUSPENDIDO"
                }
            })

            //APLICAMOS EL ALGORITMO DE BEST-FIT YA COMO SABEMOS QUE ES EL QUE ES EL PRIMER PROCESO O PROCESOS EN ARRIBAR Y LAS PARTICIONES ESTAN TODAS LIBRES
            copia.listaDeProcesos.forEach(function (proceso){
                if (proceso.estado == 'LISTO Y SUSPENDIDO') {
                    let particionesLibres = copia.memoria.particiones.filter(function (particion) {
                        return particion.libre === true
                    })
                    
                    if (particionesLibres != 0) {
                        bestFit(particionesLibres, proceso)
                    }   

                    //CALCULAMOS LA FRAGMENTACION TOTAL DE LA MEMORIA
                    let totalFragment = 0
                    copia.memoria.particiones.forEach(function (particion){
                        totalFragment = totalFragment + particion.fragmentacion
                    });
                    copia.memoria.fragmentacion = totalFragment

                }

            });
            
            //ORDENAMOS LA LISTA DE PROCESOS POR TIEMPO DE IRRUPCION DE MENOR A MAYOR (SE HACE UNA SOLA VEZ EN TODA LA SIMULACION)
            copia.sjf()

            //AGREGAR EL PROCESO A LA CPU
            let colaListos = copia.listaDeProcesos.filter(function (proceso){
                return proceso.estado == "LISTO"
            })

            copia.cpu.procesoEjecutando = colaListos[0]
            copia.cpu.procesoEjecutando.estado = "EJECUTANDO"

            //EL TIEMPO DE CONTROL tControl ES UN PARAMETRO QUE SOLO ES NECESARIO PARA LA IMPLEMENTACION DEL ALGORITMO
            copia.cpu.procesoEjecutando.tControl = tiempo + copia.cpu.procesoEjecutando.irrupcion
            
            //COLOCAMOS UNA VARIABLE QUE NOS INDICA EL EVENTO QUE OCURRE
            let evento = `ARRIBO DE PROCESOS EN EL TIEMPO ${tiempo}`
            listaDeEstados.push(evento)

            //COLOCAMOS LA COPIA EN LA LISTA DE ESTADOS 
            listaDeEstados.push(copia)
        }       
        
        copia = clonar(copia)
    }

    let ultimo = listaDeEstados.length - 1
    let ultimoEstado  = clonar(listaDeEstados[ultimo]) 
    ultimoEstado.cpu.procesoEjecutando.estado = "TERMINADO"
    ultimoEstado.listaDeProcesos.forEach(function (proceso){
        if (proceso.nombre == ultimoEstado.cpu.procesoEjecutando.nombre) {
            proceso.estado = "TERMINADO"
        }
    })

    ultimoEstado.memoria.particiones.forEach(function (particion){
        if (particion.procesoActual.nombre == ultimoEstado.cpu.procesoEjecutando.nombre) {
            particion.procesoActual = "SIN ASIGNAR"
            particion.libre = true
            particion.fragmentacion = 0
        }
    })

    ultimoEstado.cpu = "NO HAY PROCESOS EJECUTANDOSE"

    //CALCULAMOS LA FRAGMENTACION TOTAL DE LA MEMORIA
    let totalFragment = 0
    ultimoEstado.memoria.particiones.forEach(function (particion){
        totalFragment = totalFragment + particion.fragmentacion
    });
    ultimoEstado.memoria.fragmentacion = totalFragment   

    //COLOCAMOS UNA VARIABLE QUE NOS INDICA EL EVENTO QUE OCURRE
    let evento = `FIN DE LA SIMULACION. EL ESTADO FINAL ES EL SIGUIENTE`
    listaDeEstados.push(evento)   

    //COLOCAMOS EL ULTIMO ESTADO
    listaDeEstados.push(ultimoEstado)

    //RETORNAMOS LOS DATOS. LA LISTA DE ESTADOS SIEMPRE TIENE COMO PRIMER ELEMENTO LA COPIA ORIGINAL
    return listaDeEstados
}