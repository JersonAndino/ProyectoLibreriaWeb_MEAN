import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Cuenta } from '../models/cuenta';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CuentaService{
    public url:string;
    constructor(
        private _http:HttpClient,
        //private toastr: ToastrService
    ){
        this.url=Global.url;
    }

// guardar usuario
//http://localhost:3600/create-user
guardarCuenta(cuenta:Cuenta):Observable<any>{
    let params=JSON.stringify(cuenta);
    //console.log(params);
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'save-cuenta',params,{headers:headers});
}

// guardar usuario
//http://localhost:3600/create-user
getCuentasUsuario(user_id:string):Observable<any>{
    //let params=JSON.stringify(cuenta);
    //console.log(params);
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'cuentas/'+user_id,{headers:headers});
}

// validar cuenta
//http://localhost:3600/create-user
validarCuenta(cuenta:string):Observable<any>{
    //let params=JSON.stringify(cuenta);
    //console.log(params);
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'validar-cuenta/'+cuenta,{headers:headers});
}

}