import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Global } from 'src/app/services/global';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UsuarioService]
})
export class LoginComponent implements OnInit{
  public titulo:string;
  public us:string;
  public pwd:string;
  public connected:any;
  public messages:any;
  public user:any;
  public id:any;
  constructor(
    private _usuarioService:UsuarioService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.titulo="LOGIN";
    this.us='';
    this.pwd='';
    this.messages=null;
    this.user=null;
    this.id=null;
    this._usuarioService.loggedIn.subscribe(resp =>{
      if(resp==true){
        this.connected=true;
      }else{
        this.connected=false;
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
  }
  ngOnInit(): void {
  }
  login(form:NgForm){
    let user = form.value.user;
    let password = form.value.password;
    this._usuarioService.login(user,password).subscribe(
      response=>{
        if(response.usuario){
          window.location.reload();
          this.connected=true;
          this.messages={message:response.message,status:'success'};
          this.user=response.session.user.user;
        }else{
          this.connected=false;
        }
      }
      ,error=>{
        //console.log(<any>error);
        this.messages={message:<any>error.error.message,status:'failed'}
        this.connected=false;
      }
    );
  }
  logout(){
    this._usuarioService.logout().subscribe(
      response=>{
        window.location.reload();
        this.connected=false;
      }
      ,error=>{
        console.log(<any>error)
      }
    );
  }
}
