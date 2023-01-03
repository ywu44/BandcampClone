import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthService, 
    private formBuiler: FormBuilder, 
    private router: Router
    ) { }

  loginForm = this.formBuiler.group({
    userInput: ['', Validators.required],
    password: ['', Validators.required]
  })
  login() {
    const { userInput, password } = this.loginForm.controls;
    if (userInput.errors?.['required']) {
      alert("Input can't be empty!");
    } else if (password.errors?.['required']) {
      alert("Input can't be empty!");
    } else {
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: data => {
          this.authService.loginData = data;
          localStorage.setItem('accessToken', this.authService.loginData.accessToken);
          localStorage.setItem('user', JSON.stringify(this.authService.loginData.user));
          alert('You have successfully logged in!')
          setTimeout(() => {
            this.router.navigate(['']);
          }, 500);
        },
        error: error => {
          console.log(error)
          alert(error.error.error)
        }
      });
    }
    this.loginForm.reset({
      userInput: '',
      password: ''
    });
  }
}
