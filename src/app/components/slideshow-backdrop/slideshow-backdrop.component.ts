import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../Interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas : Pelicula[] = [];

  slidesOptions = {
    slidesPerView: 1.1,
    freeMode: true
  };

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {

  }

  async verDetalle(id : string){
    const modal = await this.modalCtrl.create({
      component:DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }

}
