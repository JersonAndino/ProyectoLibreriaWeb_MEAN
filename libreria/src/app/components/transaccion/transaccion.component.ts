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
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css'],
  providers: [UsuarioService,TransaccionService]
})
export class TransaccionComponent {
  public titulo:string;
  public connected=false;
  public messagesT:any;
  public messagesV:any;
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
    this.messagesT=null;
    this.messagesV=null;
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
        
        //this.getTransacciones(this.transaccion.cuenta_emisor);
        //this.transaccion.cuenta_emisor=this.cuentas[0];
      }
    });
    
  }
  ngOnInit(): void {
    
  }
  doTransaccion(form:NgForm){
    this.messagesT=null;
    this.validarCuenta();
    if (this.validarMonto()==true && this.cuentaValida==true){
      this._transaccionService.doTransaccion(this.transaccion).subscribe(
        response=>{
          //console.log(response);
          this.messagesT={message:"La transaccion se ha realizado con exito",status:'success'};
          window.location.reload();
        },
        error=>{
          //console.log(error);
          this.messagesT={message:"La transaccion no se ha podido realizar, intente mas tarde",status:'failed'};
        }
      );
    }else{
      this.messagesV={message:"Debe validar los datos ingresados",status:'failed'};
      this.messagesT=null;
    }
  }
  getCuentasUsuario(user_id:string){
    this._accountService.getCuentasUsuario(user_id).subscribe(
      response=>{
        if(response.result){
          this.cuentas=response.result;
          this.transaccion.cuenta_emisor=this.cuentas[0].cuenta;
        }else{
          //console.log("Error al recuperar los datos de sus cuentas")
        } 
      },
      error=>{
        console.log(<any>error);
        //this.messages={message:'No se ha podido registrar la account',status:'failed'};;
      }
    );
  }
  validarCuenta(){
    this.messagesT=null;
    var cuen=this.transaccion.cuenta_receptor.toString();
    this._accountService.validarCuenta(cuen).subscribe(
      response=>{
        if(response.result){
          //this.cuentas=response.result;
          //console.log(response.result);
          this.cuentaValida=true;
          this.messagesV=null;
        }else{
          //console.log("Error al recuperar los datos de sus cuentas")
          this.cuentaValida=false;
          this.messagesV={message:'No se ha encontrado esta cuenta, verifique los datos ingresados',status:'failed'}
          this.messagesT=null;
        } 
      },
      error=>{
        console.log(<any>error);
        this.cuentaValida=false;
        this.messagesV={message:'No se ha encontrado esta cuenta, verifique los datos ingresados',status:'failed'}
        this.messagesT=null;
        //this.messages={message:'No se ha podido registrar la account',status:'failed'};;
      }
    );
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

