import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private localstorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm = () => {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
    
  }

  login = () => {
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.auth.login(data).subscribe((user) => {

      this.localstorageService.setToken(user.authorisation.token)
      this.router.navigate(['/'])
    })
  }

}
