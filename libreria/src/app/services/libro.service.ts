import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Libro } from '../models/libro';
import { Observable } from 'rxjs';
import { Global } from './global';
@Injectable()
export class LibroService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
// ver todos los libros
//http://localhost:3600/libros
getLibros():Observable<any>{
    //console.log(this.url+'libros');
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'libros',{headers:headers});;
}
// guardar libro
//http://localhost:3600/guardar-libro
guardarLibro(libro:Libro):Observable<any>{
    let params=JSON.stringify(libro);
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'guardar-libro',params,{headers:headers});
}
// ver libro
//http://localhost:3600/libro/:id
getLibro(id:string):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'libro/'+id,{headers:headers});
}
// editar libro
//http://localhost:3600/libro/:id
updateLibro(libro:Libro):Observable<any>{
    let params=JSON.stringify(libro);
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'libro/'+libro._id,params,{headers:headers});
}
//eliminar libro
//http://localhost:3600/libro/:id
deleteLibro(id:string):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'libro/'+id,{headers:headers});
}
}