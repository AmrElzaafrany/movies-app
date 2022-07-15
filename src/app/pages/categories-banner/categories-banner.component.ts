import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.css']
})
export class CategoriesBannerComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {

    this._getCategories();
  }

  private _getCategories = () => {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories.message 
    })
  }

}
