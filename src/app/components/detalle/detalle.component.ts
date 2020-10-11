import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../Interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  peliculaDetalle: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;

    slideOptActores = {
      spaceBetween: -5,
      slidesPerView: 3.5,
      freeMode: true,
    };

  constructor(private moviesService: MoviesService, 
    private modalCtrl:ModalController,
    private dataLocal:DataLocalService) { }

  ngOnInit() {
    console.log(this.id);
    this.moviesService.getPeliculaDetalle(this.id)
    .subscribe(resp =>{
      this.peliculaDetalle = resp; 

    });

    this.moviesService.getActoresPelicula(this.id)
    .subscribe(resp =>{
      this.actores = resp.cast;
    });
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    this.dataLocal.guardarPelicula(this.peliculaDetalle);
  }

}
