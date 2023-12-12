export class Personaje
{//id nombre tipo
    constructor(id,nombre,tipo){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
    }

    setId(value){
        this.id = value;
    }

    setNombre(value){
        this.nombre = value;
    }

    setTipo(value){
        this.tipo = value;
    }

    getNombre(){
        return this.nombre;
    }

    getId(){
        return this.id;
    }

    getTipo(){
        return this.tipo;
    }
}