import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
import { LibroService } from 'src/app/services/libro.service';
import { Libro } from '../../models/libro';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
  providers:[LibroService]
})
export class LibrosComponent implements OnInit {
  public libros:Libro[];
  public url:string;

  constructor(
    private _libroService:LibroService
  ){
    this.url=Global.url;
    this.libros=[];
  }
  ngOnInit(): void {
      this.getLibros();
  }
  getLibros(){
    this._libroService.getLibros().subscribe(
      response=>{
        if(response.result){
          this.libros=response.result;
        }
      },error=>{
        console.log(<any>error);
      });
  }
}
