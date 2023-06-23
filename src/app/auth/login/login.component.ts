import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
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

  login() {
    if (this.email == '') {
      alert('Please enter email');
    } else if (this.password == '') {
      alert('Please enter password');
    } else {
      this.authService.login(this.email, this.password);
      this.email = '';
      this.password = '';
    }
  }
}
