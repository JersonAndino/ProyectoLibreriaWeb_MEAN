import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { Cuenta } from 'src/app/models/cuenta';
import { Transaccion } from 'src/app/models/transaccion';
import { Global } from 'src/app/services/global';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css'],
  providers: [UsuarioService,TransaccionService]
})
export class TransaccionComponent {
  public titulo:string;
  public connected=false;
  public messages:any;
  public user:any;
  public id:any;

  public transaccion:Transaccion;
  public transaccionGuardar:Transaccion;
  public idGuardado:String;

  public cuentas:Cuenta[];
  public cuentaValida:boolean;
  public montoValido:boolean;

  constructor(
    private _usuarioService:UsuarioService,
    private _transaccionService:TransaccionService,
    private _accountService:CuentaService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.titulo="Transferir";
    this.connected=false;
    this.messages=null;
    this.user=null;
    this.id=null;
    this.cuentas=[];

    this.transaccion=new Transaccion('','',0,new Date(),'Transferencia');
    this.transaccionGuardar=new Transaccion('','',0,new Date(),'Transferencia');
    this.idGuardado='';
    this.cuentaValida=false;
    this.montoValido=true;

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
        this.getCuentasUsuario(this.id);
        //this.transaccion.cuenta_emisor=this.cuentas[0];
      }
    });
    
  }
  ngOnInit(): void {
    
  }
  doTransaccion(form:NgForm){
    if (this.validarMonto() && this.validarCuenta()){
    this._transaccionService.doTransaccion(this.transaccion).subscribe(
      response=>{
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    );
    }else{
      console.log("No concuerda");
    }
  }
  getCuentasUsuario(user_id:string){
    this._accountService.getCuentasUsuario(user_id).subscribe(
      response=>{
        if(response.result){
          this.cuentas=response.result;
          this.transaccion.cuenta_emisor=this.cuentas[0].cuenta;
        }else{
          console.log("Error al recuperar los datos de sus cuentas")
        } 
      },
      error=>{
        console.log(<any>error);
        //this.messages={message:'No se ha podido registrar la account',status:'failed'};;
      }
    );
  }
  validarCuenta():boolean{
    
    var cuen=this.transaccion.cuenta_receptor.toString();
    this._accountService.validarCuenta(cuen).subscribe(
      response=>{
        if(response.result){
          //this.cuentas=response.result;
          //console.log(response.result);
          this.cuentaValida=true;
          return true;
        }else{
          console.log("Error al recuperar los datos de sus cuentas")
          this.cuentaValida=false;
          return false;
        } 
      },
      error=>{
        console.log(<any>error);
        this.cuentaValida=false;
        return false;
        //this.messages={message:'No se ha podido registrar la account',status:'failed'};;
      }
    );
    return false;
  }
  validarMonto():boolean{
    var cuentaTemp=null;
    for(let cuenta of this.cuentas){
      if(cuenta.cuenta==this.transaccion.cuenta_emisor){
        cuentaTemp=cuenta;
      }
    }
    if(cuentaTemp && cuentaTemp.saldo>=this.transaccion.monto && this.transaccion.monto>0){
      return true;
    }else{
      return false;
    }
  }
}

