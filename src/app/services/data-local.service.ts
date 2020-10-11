import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor(private storage: Storage,
    private toastCtrl: ToastController) { }
  peliculas:PeliculaDetalle[] = [];

  async presentToast(message:string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }


guardarPelicula(pelicula: PeliculaDetalle){

  let existe = false;
  let mensaje ="";
  for(const peli of this.peliculas){
    if(peli.id === pelicula.id){
      existe =true;
      break;
    }
  }


  if(existe){

    this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
    mensaje = "Borrado de favoritos";

  }else{

    this.peliculas.push(pelicula);
    mensaje = "Añadido a favoritos";

  }



  this.peliculas.push(pelicula);
  
  console.log(this.peliculas);
  
  this.storage.set('pelicula',this.peliculas);
  this.presentToast(mensaje);

}

}
