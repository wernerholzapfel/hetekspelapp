import {Injectable} from '@angular/core';
import {combineLatest, from, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/auth';
import {MenuService} from './menu.service';
import {distinctUntilChanged, switchMap, take} from 'rxjs/operators';
import firebase from 'firebase/app';
import {UiService} from './ui.service';
import {ParticipantService} from './participant.service';
import IdTokenResult = firebase.auth.IdTokenResult;

@Injectable()
export class AuthService {
    public user$: Observable<firebase.User>;
    public isAdmin = false;
    public displayName: string;
    public user: firebase.User;

    constructor(private fireAuth: AngularFireAuth,
                private router: Router,
                private menuService: MenuService,
                private uiService: UiService,
                private participantService: ParticipantService) {

        this.user$ = fireAuth.user;

        this.user$.pipe(distinctUntilChanged())
            .pipe(switchMap(user => {
                if (user) {
                    return combineLatest([this.participantService.getParticipant(),
                        of(user),
                        this.getTokenResult(),
                        this.uiService.isRegistrationOpen$]);
                } else {
                    return combineLatest([of(null), of(user), of(null)]);
                }

            })).subscribe(([participant, user, tokenResult, isRegistrationOpen]) => {
            if (user && participant && tokenResult) {
                this.user = user;
                this.displayName = user.displayName;
                this.uiService.participant$.next(participant);
                this.isAdmin = tokenResult && tokenResult.claims ? tokenResult.claims.admin : false;
                this.uiService.isAdmin$.next(this.isAdmin);
                this.menuService.setMenu(this.isAdmin, !!this.user, isRegistrationOpen);
            } else {
                this.user = null;
                this.displayName = null;
                this.isAdmin = false;
                this.uiService.isAdmin$.next(this.isAdmin);
                this.uiService.participant$.next(null);
                this.menuService.setMenu(this.isAdmin, false, false);
                return of(null);
            }
        });
    }

    signInRegular(email, password) {
        return from(this.fireAuth.signInWithEmailAndPassword(email, password));
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
            .then(() => {
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
