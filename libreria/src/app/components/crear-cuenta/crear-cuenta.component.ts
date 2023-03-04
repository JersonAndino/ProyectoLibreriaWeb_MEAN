import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { Cuenta } from 'src/app/models/cuenta';
import { Global } from 'src/app/services/global';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-account',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'],
  providers: [UsuarioService,CuentaService]
})
export class CrearCuentaComponent {
  public titulo:string;
  public connected=false;
  public messages:any;
  public user:any;
  public id:any;

  public account:Cuenta;
  public accountGuardar:Cuenta;
  public idGuardado:string;

  constructor(
    private _usuarioService:UsuarioService,
    private _accountService:CuentaService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.titulo="CREAR CUENTA";
    this.connected=false;
    this.messages=null;
    this.user=null;
    this.id=null;
    
    this.account=new Cuenta(this.id,'','',0,false);
    this.accountGuardar=new Cuenta('','','',0,false);
    this.idGuardado='';

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
      }
    });
    
  }
  ngOnInit(): void {
  }
  guardarCuenta(form:NgForm){
    this.account.user_id=this.id;
    console.log(this.account);
    this._accountService.guardarCuenta(this.account).subscribe(
      response=>{
        if(response.result){
          this.accountGuardar=response.result;
          this.idGuardado=response.result._id;
          this.messages={message:'account registrada con éxito',status:'success'};
        }else{
          this.messages={message:'No se ha podido registrar la account',status:'failed'};;
        } 
      },
      error=>{
        console.log(<any>error);
        this.messages={message:'No se ha podido registrar la account',status:'failed'};;
      }
    );
  }

  getCuentasUsuario(user_id:string){
    this._accountService.getCuentasUsuario(user_id).subscribe(
      response=>{
        if(response.result){
          console.log(response.result);
        }else{
          console.log("ERROR 1")
        } 
      },
      error=>{
        console.log(<any>error);
        //this.messages={message:'No se ha podido registrar la account',status:'failed'};;
      }
    );
  }
  
}
