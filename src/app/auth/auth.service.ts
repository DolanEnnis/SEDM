// THis service was set up with the help of https://www.youtube.com/watch?v=eFtrzzP2wMc

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  //login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/welcome']);
      },
      (err) => {
        alert('Something went wrong!!!' + err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  //Register method
  signup(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        this.router.navigate(['/login']);
      },
      (err) => {
        alert('Something went wrong!!!' + err.message);
        this.router.navigate(['/signup']);
      }
    );
  }

  // Sign Out method
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert('Something went wrong!!!' + err.message);
      }
    );
  }
}
