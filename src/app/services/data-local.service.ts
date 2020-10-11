import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor(private storage: Storage,
    private toastCtrl: ToastController) { 
      this.cargarFavoritos();

    }
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
  console.log(this.peliculas);
  
  this.storage.set('peliculas',this.peliculas);
  this.presentToast(mensaje);

  return !existe;
}

async cargarFavoritos(){
  
  const peliculas = await this.storage.get('peliculas')

  this.peliculas = peliculas || [];
  
  return this.peliculas;
}

async existePelicula(id){

  await this.cargarFavoritos();
  const existe = this.peliculas.find(peli => peli.id === id);

  return (existe) ? true : false;

}

}
