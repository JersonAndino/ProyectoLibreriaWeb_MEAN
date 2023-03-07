import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { Cuenta } from 'src/app/models/cuenta';
import { Transaccion } from 'src/app/models/transaccion';
import { Global } from 'src/app/services/global';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.css'],
  providers: [UsuarioService,TransaccionService, CuentaService]
})
export class DetalleCuentaComponent {
  public titulo:string;
  public connected=false;
  public messagesT:any;
  public messagesV:any;
  public user:any;
  public id:any;

  public transacciones:Transaccion[];
  public cuenta:String;

  constructor(
    private _usuarioService:UsuarioService,
    private _transaccionService:TransaccionService,
    private _accountService:CuentaService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.titulo="Transferir";
    this.connected=false;
    this.messagesT=null;
    this.messagesV=null;
    this.user=null;
    this.id=null;
    this.transacciones=[];
    this.cuenta='';

    this._usuarioService.loggedIn.subscribe(resp =>{
      if(resp==true){
        this.connected=true;
      }
    });
    this._usuarioService.user.subscribe(resp =>{
      if(resp!=''){
        this.user=resp;
      }
    });
    this._usuarioService.id.subscribe(resp =>{
      if(resp!=''){
        this.id=resp;
      }
    });

    
    this._route.params.subscribe(params=>{
      this.cuenta=params['cuenta'];
      this.getTransacciones(this.cuenta.toString());
    })
    
  }
  ngOnInit(): void {
  }
  getTransacciones(cuenta:string){
    this._transaccionService.getTransacciones(cuenta).subscribe(
      response=>{
        this.transacciones=response.result;
        console.log(response.result);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
  parseTipo(transaccion:Transaccion):boolean{
    if(transaccion.cuenta_emisor==this.cuenta){
      return true;
    }else{
      return false;
    }
  }
  desactivarCuenta():string{
    this._accountService.desactivarCuenta(this.cuenta).subscribe(
      response=>{
        this._router.navigate(['/cuentas']);
      }
      ,error=>{
        console.log(error);
      }
    );
    return '';
  }
}

