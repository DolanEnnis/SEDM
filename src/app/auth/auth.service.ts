// THis service was set up with the help of https://www.youtube.com/watch?v=eFtrzzP2wMc

import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';
/* import { Store } from '@ngrx'; */
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

interface User {
  email: string;
  userId: string;
}

interface Patron {
  uid: string;
  email: string;
  displayName: string;
  userType: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  newPatron!: Patron;
  message: string | undefined;
  user!: Observable<User>;
  private isAuthenticated = false;
  authChange = new Subject<boolean>();
  private currentPatron!: Patron;

  constructor(
    private fireauth: AngularFireAuth,
    //private afs: AngularFirestore,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit() {
    this.data.currentMessage.subscribe((message) => (this.message = message));
  }

  initAuthListener() {
    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.getUserData(user.uid);
        this.router.navigate(['/']);
      } else {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }
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

  getUseruid() {
    return this.currentPatron.uid;
  }

  private getUserData(uid: string) {
    this.currentPatron = {
      uid: '123456',
      email: 'dummy@example.com',
      displayName: 'Dummy',
      userType: 'tester',
    };
    //this.data.changeMessage(this.currentPatron.displayName);

    /* const docRef = this.afs.collection('users');
    docRef.valueChanges().subscribe({
      next: (patrons: unknown[]) => {
        const typedPatrons = patrons as Patron[]; // Type assertion
        for (let person of typedPatrons) {
          if (uid == person.uid) {
            this.currentPatron = person;
            this.data.changeMessage(person.displayName);
          }
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    }); */
  }
}
