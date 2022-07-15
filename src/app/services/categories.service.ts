import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { Generic } from '../models/generic';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoriesUrl = environment.url + 'category'


  constructor(
    private http: HttpClient
  ) { }

  getCategories = (): Observable<Generic<Category[]>> => {
    return this.http.get<Generic<Category[]>>((`${this.categoriesUrl}`))
  }

  createCategory = (category: Category): Observable<Generic<Category>> => {
    return this.http.post<Generic<Category>>(`${this.categoriesUrl}`,category)
  }
}
