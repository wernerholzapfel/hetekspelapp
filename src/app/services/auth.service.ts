import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/auth';
import {MenuService} from './menu.service';
import {take} from 'rxjs/operators';
import firebase from 'firebase/app';
import IdTokenResult = firebase.auth.IdTokenResult;

@Injectable()
export class AuthService {
  public user$: Observable<firebase.User>;
  public isAdmin = false;
  public displayName: string;
  public user: firebase.User;

  constructor(private fireAuth: AngularFireAuth,
              private router: Router,
              private menuService: MenuService) {
    this.user$ = fireAuth.user;

    this.user$.subscribe(user => {
      if (user) {
        this.getTokenResult().subscribe(tokenResult => {
          this.user = user;
          this.displayName = user.displayName;
          this.isAdmin = tokenResult.claims.admin;
          this.menuService.setMenu(this.isAdmin, this.user, false);
        });
      } else {
        console.log('er is geen user meer');
        this.user = null;
        this.displayName = null;
        this.isAdmin = false;
        this.menuService.setMenu(this.isAdmin, this.user, false);
      }
    });
  }

  signInRegular(email, password) {
    return of(this.fireAuth.signInWithEmailAndPassword(email, password));
  }

  updateProfile(displayName: string) {
    this.fireAuth.user.pipe(take(1)).subscribe(user => {
      user.updateProfile({displayName});
    });
  }

  signUpRegular(email, password, displayName) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    return this.fireAuth.authState;
  }

  logout() {
    this.fireAuth.signOut()
        .then(response => {
          this.router.navigate(['/']);
        });
  }

  getToken(): Observable<string> {
    return this.fireAuth.idToken;
  }

  getTokenResult(): Observable<IdTokenResult> {
    return this.fireAuth.idTokenResult;
  }

  sendPasswordResetEmail(email: string): Promise<any> {
    return this.fireAuth.sendPasswordResetEmail(email);
  }
}
