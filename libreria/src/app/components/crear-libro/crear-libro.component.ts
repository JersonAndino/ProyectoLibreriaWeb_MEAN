import { Component,OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CargarService } from 'src/app/services/cargar.service';
import { LibroService } from 'src/app/services/libro.service';
import { Libro } from 'src/app/models/libro';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css'],
  providers:[LibroService,CargarService]
})
export class CrearLibroComponent implements OnInit{
  public titulo:string;
  public libro:Libro;
  public libroGuardar:Libro;
  public url:string;
  public status:string;
  public idGuardado:string;
  public archivosParaCargar:Array<File>;
  @ViewChild('archivoImagen') fileInput:any;

  constructor(
    private _libroService:LibroService,
    private _cargarService:CargarService
  ){
    this.titulo="GUARDAR LIBRO";
    this.url=Global.url;
    this.libro=new Libro('','','','',2023,100,'');
    this.libroGuardar=new Libro('','','','',2023,100,'');
    this.status='';
    this.idGuardado='';
    this.archivosParaCargar=[];
  }
  ngOnInit(): void {
    
  }
  guardarLibro(form:NgForm){
    this._libroService.guardarLibro(this.libro).subscribe(
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
              this.fileInput.nativeElement.value='';
            });
          }else{
            this.status='failed';
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
