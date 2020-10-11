import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../Interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private movieSvc: MoviesService, 
    private modalCtrl: ModalController) {}
  
  textoBuscar:string;
  ideas: string[] = ['Spiderman', 'Avengers', 'Superman', 'El Hobbit']
  peliculas:Pelicula[] = [];
  buscando = false;


  buscar(event){
    const valor = event.detail.value;

    if(valor.length === 0){
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;
    
    this.movieSvc.getBuscarPelicula(valor)
    .subscribe(resp => {
      this.peliculas = resp.results;
      this.buscando= false;
    });

  }

  async verDetalle(id : string){
    console.log(id);
    const modal = await this.modalCtrl.create({
      component:DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }


}
