import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}
  ngOnInit() {}

  /*   onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    })
  } */

  signup() {
    if (this.email == '') {
      alert('Please enter email');
    } else if (this.password == '') {
      alert('Please enter password');
    } else {
      this.authService.signup(this.email, this.password);
      this.email = '';
      this.password = '';
    }
  }
}
