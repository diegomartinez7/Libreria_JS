class Libro{
    //Propiedades
    id = 0;
    autor = '';
    titulo = '';

    agregar(infoLibro){
        this.autor = infoLibro.autor;
        this.titulo = infoLibro.titulo;
        this.id = infoLibro.id;
        console.log(this.id,this.autor,this.titulo);

        const tr = document.createElement('tr');
        tr.setAttribute('id',`${this.id}`);
        tr.innerHTML = `
            <th scope="row">${this.id}</th>
            <td>${this.titulo}</td>
            <td>${this.autor}</td>
            <td>
                <div class="btn-group" role="" aria-label="Basic example">
                    <button id="editar${this.id}" type="button" class="btn btn-success"><i class="fas fa-edit"></i></button>
                    <button id="eliminar${this.id}" type="button" class="btn btn-warning"><i class="fas fa-trash"></i></button>
                </div>
            </td>`;
        console.log(tr);

        return tr;
    }

    eliminar(element){
        //element sólo puede tomar dos valores ('I','BUTTON')
        if(element.tagName=='I'){
            element.parentElement.parentElement.parentElement.parentElement.remove();
            LocalStorageOperation.BorrarLibro(element.parentElement.parentElement.parentElement.parentElement.id);
        }
        else if(element.tagName=='BUTTON'){
            element.parentElement.parentElement.parentElement.remove();
            LocalStorageOperation.BorrarLibro(element.parentElement.parentElement.parentElement.id);
        }
    }

    editar(idEdit){
        let inputT = document.getElementById('inputTitulo');
        let inputA = document.getElementById('inputAutor');
        //Comprobamos que el libro editado no esté repetido
        if(!LocalStorageOperation.validarLibro(inputT.value.trim().toLowerCase(),inputA.value.trim().toLowerCase())){
            let arrayLibros = LocalStorageOperation.obtenerLS();
            
            //Comparar autor y título extraídos del nuevo modal
            for(let i = 0; i<arrayLibros.length; i++){
                if(arrayLibros[i].id == idEdit){
                    arrayLibros[i].titulo = inputT.value;
                    arrayLibros[i].autor = inputA.value;
                }
            }
            localStorage.clear();
            localStorage.setItem('Libros',JSON.stringify(arrayLibros));
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'El libro fue editado exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
        }
        else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `El libro ${inputT.value} escrito por ${inputA.value} ya existe en la librería`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
}