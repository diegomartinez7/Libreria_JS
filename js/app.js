//Elementos input con información del libro Nuevo
const autor = document.getElementById('inputAutor');
const titulo = document.getElementById('inputTitulo');
const tabla = document.getElementsByTagName('tbody');
const inputBuscar = document.getElementById('inputBuscar');

const patern = /^[a-zA-ZÁ-ÿ0-9\s]{3,20}$/;

const libro = new Libro();

function EventListener(){
    document.getElementById('btnAdd').addEventListener('click',PrepararLibro);
    tabla[0].addEventListener('click',Acciones);
    document.getElementById('btnVaciar').addEventListener('click',vaciarLibreria);
    document.getElementById('btnBuscar').addEventListener('click',buscarLibro);
}
EventListener();
PrepararDom();

function PrepararLibro(){
    if((autor.value != '' && titulo.value != '') && (patern.test(autor.value) && patern.test(titulo.value))){
        if(!LocalStorageOperation.validarLibro(titulo.value.trim().toLowerCase(),autor.value.trim().toLowerCase())){
            let ultimoId = Number(LocalStorageOperation.ultimoId());
            const infoLibro = {
                id: ++ultimoId,
                titulo: titulo.value.trim(),
                autor: autor.value.trim()
            }

            let tr = libro.agregar(infoLibro);
            tabla[0].appendChild(tr);
            LocalStorageOperation.almacenarLibro(infoLibro);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se agregó el libro',
                showConfirmButton: false,
                timer: 1500
            });
            autor.value = '';
            titulo.value = '';
        }
        else{
            Swal.fire(
                'Libro existente',
                `El libro ${titulo.value} escrito por ${autor.value} ya existe en la librería`,
                'error'
            )
        }
    }
    else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function Acciones(){
    //console.log(event-EventTarget.tagName);
    if(event.target.tagName == 'I' || event.target.tagName == 'BUTTON'){
        //Filtrar botones editar y eliminar
        if(event.target.className.includes('btn-warning') || event.target.className.includes('fa-trash')){
            libro.eliminar(event.target);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se eliminó el libro',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
}

function PrepararDom(){
    const librosLS = LocalStorageOperation.obtenerLS();

    for(let i = 0; i<librosLS.length; i++){
        console.log(librosLS[i]);
        //const instanciaLibro = new Libro();
        let tr = libro.agregar(librosLS[i]);
        tabla[0].appendChild(tr);
    }
}

function vaciarLibreria(){
    console.log(tabla[0].firstChild);
    while(tabla[0].firstChild){
        tabla[0].firstChild.remove();
    }
    LocalStorageOperation.BorrarStorage();
}

function buscarLibro(){
    event.preventDefault();
    if(inputBuscar.value != ''){
        let resultado = LocalStorageOperation.buscarTitulo(inputBuscar.value.trim().toLowerCase());
        if(resultado != ''){
            Swal.fire(
                'Búsqueda exitosa',
                `El libro con título ${resultado.titulo} tiene id ${resultado.id} y fue escrito por ${resultado.autor}`,
                'success'
            )
        }
        else{
            Swal.fire(
                'Sin resultados',
                `El libro ${inputBuscar.value} no se encuentra en la librería`,
                'error'
            )
        }
        inputBuscar.value = '';
    }
}