import { Component,OnInit } from '@angular/core';
import { LibroService } from 'src/app/services/libro.service';
import { Libro } from '../../models/libro';
import { Global } from 'src/app/services/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.css'],
  providers:[LibroService]
})
export class DetalleLibroComponent implements OnInit{
  public url:string;
  public libro:Libro;
  public confirm:boolean;

  constructor(
    private _libroService:LibroService,
    private _router:Router,
    private _route:ActivatedRoute
  ){  
    this.url=Global.url;
    this.libro=new Libro('','','','',2023,200,'');
    this.confirm=false;
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
  setConfirm(confirm:boolean){
    this.confirm=confirm;
  }
  borrarLibro(id:string){
    this._libroService.deleteLibro(id).subscribe(
      response=>{
        if(response.result){
          this._router.navigate(['/libros']);
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
}
