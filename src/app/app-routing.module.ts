import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MoviesFormComponent } from './movies/movies-form/movies-form.component';
import { CategoriesFormComponent } from './pages/categories-form/categories-form.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    component: HomeComponent
  },
  {
    path: 'moviesByCategory/:id',
    canActivate:[AuthGuard],
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'add-movie',
    canActivate:[AuthGuard],
    component: MoviesFormComponent
  },
  {
    path: 'edit-movie/:id',
    canActivate:[AuthGuard],
    component: MoviesFormComponent
  },
  {
    path: 'category-form',
    canActivate:[AuthGuard],
    component: CategoriesFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule { }
