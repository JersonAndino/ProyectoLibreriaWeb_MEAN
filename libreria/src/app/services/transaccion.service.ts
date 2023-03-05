import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Cuenta } from '../models/cuenta';
import { Transaccion } from '../models/transaccion';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TransaccionService{
    public url:string;
    constructor(
        private _http:HttpClient,
        //private toastr: ToastrService
    ){
        this.url=Global.url;
    }

// hacer transaccion
//http://localhost:3600/do-transaccion
doTransaccion(transaccion:Transaccion):Observable<any>{
    let params=JSON.stringify(transaccion);
    //console.log(params);
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'do-transaccion',params,{headers:headers});
}
}