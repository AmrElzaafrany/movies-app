import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  categoryForm!: FormGroup;
  category!:Category

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService

  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm = () => {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  addCategory = () => {
    const data: Category = {
      name: this.categoryForm.value.name
    }
    this.categoriesService.createCategory(data).subscribe();
  }

}
