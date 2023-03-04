export class Cuenta{
    constructor(
        public user_id:any,
        public tipo:string,
        public cuenta:string,
        public saldo:number,
        public isActive:boolean
    ){}
}