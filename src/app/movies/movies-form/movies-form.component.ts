import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Generic } from 'src/app/models/generic';
import { Movie } from 'src/app/models/movie';
import { CategoriesService } from 'src/app/services/categories.service';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.css']
})
export class MoviesFormComponent implements OnInit {



  moviesForm!: FormGroup;
  categories: Category[] = [];
  editMode = false;
  currentMovieId!: number;
  imageDisplay: string | ArrayBuffer | undefined;
  movies!: Movie;
  message: string = '';


  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService


  ) { }

  ngOnInit() {

    this.createForm();
    this.getCategories();
    this._checkEditMode();

  }

  getCategories = () => {
    this.categoriesService.getCategories().subscribe((data: Generic<Category[]>) => {
      this.categories = data.message
      console.log(this.categories)
    })
  }


  createForm = () => {
    this.moviesForm = this.fb.group({
      name: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }

  submit = () => {

    const movieFormData = new FormData();
    Object.keys(this.moviesFormValue).map((key) => {
      movieFormData.append(key, this.moviesFormValue[key].value);
      console.log(this.moviesFormValue[key].value)

    })
    console.log(this.moviesFormValue)
    console.log(movieFormData)
    if (this.editMode) {
      movieFormData.append('_method', 'put')
      this._updateMovie(movieFormData)
    } else {
      this._addMovie(movieFormData)
      console.log(movieFormData)
    }

  }



  onImageUpload(event: any) {
    const file = event.target.files[0];
    console.log(file.name)
    if (file) {
      this.moviesForm.patchValue({ image: file });
      this.moviesForm.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string;
      }
      fileReader.readAsDataURL(file);
    }
  }

  private _checkEditMode = () => {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentMovieId = params.id;
        this.moviesService.getMovieById(params.id).subscribe((movie: Generic<Movie>) => {
          this.movies = movie.message

          this.moviesFormValue.name.setValue(this.movies.name);
          this.moviesFormValue.description.setValue(this.movies.description);
          this.moviesFormValue.category_id.setValue(this.movies.category_id);
          this.moviesFormValue.image.setValue(this.movies.image);


          console.log(this.moviesFormValue)
        })


      }
    })
  }

  private _addMovie = (movieData: FormData) => {
    this.moviesService.addMovie(movieData).subscribe((data) => {
      this.message = data.status
    })
  }

  private _updateMovie = (movieFormData: FormData) => {

    this.moviesService.updateMovie(movieFormData, this.currentMovieId).subscribe()

  }

  get moviesFormValue() {
    return this.moviesForm.controls;
  }
}
