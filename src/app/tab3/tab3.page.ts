import { Component } from '@angular/core';
import { PeliculaDetalle, Genero ,PeliculaGenero } from '../Interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  peliculas: PeliculaDetalle[] = [];
  generos: Genero[] = [];
  peliculasGenero: PeliculaGenero[];
  constructor(private dataLocal:DataLocalService, private moviesScv : MoviesService) {}


  async ionViewWillEnter(){
    this.peliculas = await this.dataLocal.cargarFavoritos();

    this.generos = await this.moviesScv.getGeneros();

    await this.peliculasPorGenero(this.generos, this.peliculas);
  }


  peliculasPorGenero(genero:Genero[], peliculasDetalle: PeliculaDetalle[]){
    

    this.peliculasGenero = [];

    genero.forEach(genero => {

      this.peliculasGenero.push({
        genero: genero.name,
        peliculas: peliculasDetalle.filter(peli => {
          return peli.genres.find(genre => genre.id === genero.id);
        })
      })
    });
  }
}
