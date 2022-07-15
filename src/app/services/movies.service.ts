import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Generic } from '../models/generic';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  moviesUrl =  environment.url + 'movies'
  categoriesUrl = environment.url + 'moviesByCategory'

  constructor(
    private http: HttpClient
  ) { }

  getMovies = (): Observable<Generic<Movie[]>> => {
    return this.http.get<Generic<Movie[]>>(`${this.moviesUrl}`)
  }

  getMoviebyCatId = (catId: number): Observable<Generic<Movie[]>> => {
    return this.http.get<Generic<Movie[]>>(`${this.categoriesUrl}/${catId}`)
  }

  getMovieById = (movieId: number): Observable<Generic<Movie>> => {
    return this.http.get<Generic<Movie>>(`${this.moviesUrl}/${movieId}`)
  }

  deleteMovie(movieId: number): Observable<Movie> {
    return this.http.delete<Movie>(`${this.moviesUrl}/${movieId}`)
  }

  updateMovie = (movieData: FormData, movieId: number): Observable<Generic<Movie>> => {
    return this.http.post<Generic<Movie>>(`${this.moviesUrl}/${movieId}`, movieData)
  }

  addMovie = (moviesData: FormData): Observable<Generic<Movie>> => {
    return this.http.post<Generic<Movie>>(`${this.moviesUrl}`,moviesData)

  }
}


