class LocalStorageOperation {
    //Propiedades

    static almacenarLibro(infoLibro){
        console.log(infoLibro);
        let arrayLibros = this.obtenerLS();
        arrayLibros.push(infoLibro);
        console.log(arrayLibros);
        localStorage.setItem('Libros',JSON.stringify(arrayLibros));
    }

    static obtenerLS(){
        if(localStorage.getItem('Libros') === null){
            console.log('Vacío');
            return [];
        }
        else{
            console.log('Sí hay libros');
            return JSON.parse(localStorage.getItem('Libros'));
        }
    }

    static BorrarStorage(){
        localStorage.clear();
    }

    static BorrarLibro(idLibro){
        console.log(idLibro);
        let arrayLibros = this.obtenerLS();
        let arrayNuevo = [];

        for(let i = 0; i<arrayLibros.length; i++){
            if(arrayLibros[i].id != idLibro){
                arrayNuevo.push(arrayLibros[i]);
            }
        }
        localStorage.clear();
        if(arrayNuevo.length > 0){
            localStorage.setItem('Libros',JSON.stringify(arrayNuevo));
        }
    }

    static ultimoId(){
        let arrayLibros = this.obtenerLS();
        if(arrayLibros == 0)
            return 0;
        return arrayLibros[arrayLibros.length-1].id;
    }

    static buscarTitulo(titulo){
        //El valor de titulo viene de app.js y es el valor que contiene el input de búsqueda
        let arrayLibros = this.obtenerLS();
        let resultado = '';
        for(let i = 0; i<arrayLibros.length; i++){
            if(titulo == arrayLibros[i].titulo.toLowerCase()){
                resultado = arrayLibros[i];
            }
        }
        return resultado;
    }

    static validarLibro(titulo,autor){
        let existe = false;
        let arrayLibros = this.obtenerLS();
        for(let i = 0; i<arrayLibros.length; i++){
            if(arrayLibros[i].titulo.toLowerCase() == titulo && arrayLibros[i].autor.toLowerCase() == autor){
                existe = true;
                break;
            }
        }
        return existe;
    }
}