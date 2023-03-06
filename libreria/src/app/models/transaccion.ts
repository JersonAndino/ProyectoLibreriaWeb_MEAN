export class Transaccion{
    constructor(
        public cuenta_emisor:String,
        public cuenta_receptor:String,
        public monto:Number,
        public fecha:any,
        public tipo:String
    ){}
}