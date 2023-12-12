import {Personaje} from "./personaje.js";

export class Monstruo extends Personaje
{//debilidad /alias/miedo
    constructor(id,nombre,tipo,debilidad,alias,miedo){
        super(id,nombre,tipo);
        this.debilidad = debilidad;
        this.alias = alias;
        this.miedo = miedo;
    }

    setDebilidad(value){
        this.debilidad = value;
    }

    setAlias(value){
        this.alias = value;
    }

    setMiedo(value){
        this.miedo = value;
    }

    getDebilidad(){
        return this.debilidad;
    }

    getAlias(){
        return this.alias;
    }

    getMiedo(){
        return this.miedo;
    }

}