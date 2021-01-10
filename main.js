const boton_agregar = document.getElementById('boton-agregar');
const lista_tareas = document.querySelector('.lista-tareas');
const boton_limpiar = document.querySelector('.boton-limpiar');

boton_agregar.addEventListener('click', () => {
  agregarTarea("")
})

boton_limpiar.addEventListener('click', () => {
  limpiarTodo()
})

lista_tareas.addEventListener('click', (event) => {
  if(event.path[0].type == 'submit') {
    eliminarTarea(event.path[1].id)
  }
})

lista_tareas.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    editarTarea(event.path[1].id, event.path[0].value)
  }
})

// Local Storage

var arregloTareas = []
var contador = 0

const getContador = () => {
  const cont = localStorage.getItem("contador")
  return cont
}

const setContador = () => {
    localStorage.setItem("contador",contador)
}

const inicilizarContador = () => {
  if (getContador() != null) {
    contador = getContador()
  }
}

const getArregloTareas = () => {
  setContador()
  const arreglo = JSON.parse(localStorage.getItem("arregloTareas"))
  return arreglo
}

const setArregloTareas = () => {
  localStorage.setItem("arregloTareas",JSON.stringify(arregloTareas))
  listarTareas()
}

const agregarTarea = (descripcion) => {
  contador++
  let objTarea = {
    id: contador,
    descripcion: descripcion
  }
  if (getArregloTareas() != null) {
    arregloTareas = getArregloTareas()
  }
  arregloTareas.push(objTarea)
  setArregloTareas()
}

const listarTareas = () => {
  lista_tareas.innerHTML = ''
  let datos = getArregloTareas().reverse()
  if (datos != null) {
    for (const tarea of datos) {
      lista_tareas.innerHTML += `
        <li id="${tarea.id}">
            <input type="text" class="input-tarea" value="${tarea.descripcion}">  
            <button class="boton-eliminar">X</button>
        </li>
      `
    }
  }
}

const editarTarea = (idTarea, descripcion) => {
  let newTarea = {
    id: idTarea,
    descripcion: descripcion
  }
  let datos = getArregloTareas()
  let newArreglo = []
  if (datos != null) {
    for (const tarea of datos) {
      if (tarea.id == idTarea) {
        newArreglo.push(newTarea)
      }else{
        newArreglo.push(tarea)
      }
    }
  }
  arregloTareas = newArreglo
  setArregloTareas()
}

const eliminarTarea = (idTarea) => {
  let datos = getArregloTareas()
  let newArreglo = []
  if (datos != null) {
    for (const tarea of datos) {
      if (tarea.id != idTarea) {
        newArreglo.push(tarea)
      }
    }
  }
  arregloTareas = newArreglo
  setArregloTareas()
}

const limpiarTodo = () => {
  arregloTareas = []
  contador = 0
  setArregloTareas()
  setContador()
}

// inicia
inicilizarContador()
listarTareas()
