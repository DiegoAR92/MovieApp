import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Generos, Genero } from '../Interfaces/interfaces';
import { environment } from '../../environments/environment';
import { resolve } from 'dns';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})


export class MoviesService {

  constructor( private http: HttpClient) { }
  private popularesPage =0;
  genero: Genero[];
  private ejecutarQuery<T>(query : string){

    query = URL + query;
    query += `&api_key=${environment.apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>( query );
  }

  getFeature(){

    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(),hoy.getMonth() + 1, 0).getDate()
    const mes = hoy.getMonth() +1;

    let mesString;

    if(mes < 10){
      mesString = '0'+ mes;
    }else{
      mesString = mes;
    }
    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares(){
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity_desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getPeliculaDetalle(id:string){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id:string){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }
  
  getBuscarPelicula(pelicula:string){
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${pelicula}`);
  }

  getGeneros(): Promise<Genero[]>{

    return new Promise( result =>{
      this.ejecutarQuery<Generos>("/genre/movie/list?a=1")
      .subscribe(resp => {
        this.genero = resp['genres'];
        result(this.genero);
      });
    });
  }

} 
