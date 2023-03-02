export class Libro{
    constructor(
        public _id:string,
        public nombre:string,
        public autor:string,
        public edicion:string,
        public anio:number,
        public precio:number,
        public imagen:string
    ){}
}