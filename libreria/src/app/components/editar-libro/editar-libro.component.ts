import { Component, OnInit } from '@angular/core';
import { CargarService } from 'src/app/services/cargar.service';
import { LibroService } from 'src/app/services/libro.service';
import { Libro } from 'src/app/models/libro';
import { Global } from 'src/app/services/global';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-libro',
  templateUrl: '../crear-libro/crear-libro.component.html',
  styleUrls: ['./editar-libro.component.css'],
  providers:[LibroService,CargarService]
})
export class EditarLibroComponent implements OnInit{
  public titulo:string;
  public libro:Libro;
  public libroGuardar:Libro;
  public url:string;
  public archivosParaCargar:Array<File>;
  public status:string;
  public idGuardado:string;

  constructor(
    private _libroService:LibroService,
    private _cargarService:CargarService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.titulo="EDITAR LIBRO";
    this.url=Global.url;
    this.libro=new Libro('','','','',2023,200,'');
    this.libroGuardar=new Libro('','','','',2023,200,'');
    this.archivosParaCargar=[];
    this.status='';
    this.idGuardado='';
  }
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this.getLibro(id);
    })
  }
  getLibro(id:string){
    this._libroService.getLibro(id).subscribe(
      response=>{
        this.libro=response.result;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
  guardarLibro(form:NgForm){
    this._libroService.updateLibro(this.libro).subscribe(
      response=>{
        if(response.result){
          if(this.archivosParaCargar){
            this._cargarService.peticionRequest(Global.url+'subir-imagen/'+response.result._id,[],this.archivosParaCargar,'imagen')
            .then((result:any)=>{
              this.libroGuardar=result.response;
              this.status='success';
              //console.log(result.response.result._id);
              this.idGuardado=result.result._id;
              form.reset();
              //this.fileInput.nativeElement.value='';
            });
          }else{
            this.libroGuardar=response.result;
            this.status='success';
            form.reset();
          }          
        }else{
          this.status='failed';
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  imagenChangeEvent(archivoSeleccionado:any){
    this.archivosParaCargar=<Array<File>>archivoSeleccionado.target.files;
  }
}
