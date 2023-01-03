import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { usernameValidator, emailValidator, passwordValidator } from '../../../input.validator';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-visitor',
  templateUrl: './navbar-visitor.component.html',
  styleUrls: ['./navbar-visitor.component.css']
})
export class NavbarVisitorComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }
  showModal: boolean = false;
  signupForm = this.formBuilder.group({
    username: ['', usernameValidator()],
    email: ['', emailValidator()],
    password: ['', passwordValidator()]
  })
  ngOnInit(): void {
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  signUp(): void {
    const { username, password, email } = this.signupForm.controls;
    if (username.errors?.['inValid']) {
      alert(username.errors?.['message']);
    } else if (email.errors?.['inValid']) {
      alert(email.errors?.['message']);
    } else if (password.errors?.['inValid']) {
      alert(password.errors?.['message']);
    } else {
      this.authService.signup(this.signupForm.getRawValue()).subscribe({
        next: data => {
          alert(data);
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 500);
        },
        error: error => {
          alert(error.error.error)
        }
      });
    }
    this.signupForm.reset({
      username: '',
      email: '',
      password: ''
    });
  }
}
