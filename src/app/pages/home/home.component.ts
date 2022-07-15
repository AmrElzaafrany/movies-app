import { Component, OnInit, ViewChild } from '@angular/core';
import { Generic } from 'src/app/models/generic';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = [];
  getMoviesbyCat = false;
  currentCategoryId!: number
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['image', 'name', 'description', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService


  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.getMoviesbyCat = true;
        this.currentCategoryId = params.id;

      }
      if (!this.getMoviesbyCat) {
        this.getMovies();
      } else {
        this.getMoviesByCatId();
      }
    })
  }

  getMovies = () => {
    this.moviesService.getMovies().subscribe((data: Generic<Movie[]>) => {
      this.movies = data.message;
      this.movies.map(movie => {
        movie.image = `https://test-api.storexweb.com/${movie.image}`
      })
      this.dataSource = new MatTableDataSource(data.message);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }


  getMoviesByCatId = () => {
    this.moviesService.getMoviebyCatId(this.currentCategoryId).subscribe((movie: Generic<Movie[]>) => {
      console.log(movie.message)
      console.log(this.currentCategoryId)
      this.movies = movie.message;
      this.movies.map(movie => {
        movie.image = `https://test-api.storexweb.com/${movie.image}`
      })
      this.dataSource = new MatTableDataSource(movie.message);
      console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  delete(id: number) {
    this.moviesService.deleteMovie(id).subscribe(() => {
      this.movies = this.movies.filter(movies => movies.id !== id);
      this.getMovies()
    })
  }

  goToCategoryForm = () => {
    this.router.navigate(['/category-form'])
  }

  edit(id: number) {
    this.router.navigateByUrl(`/edit-movie/${id}`)
  }

  addMovieForm = () => {
    this.router.navigate(['/add-movie'])
  }

}
