import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User, UserProfile } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.initializeUserOnAuth();
  }

  private initializeUserOnAuth(): void {
    this.auth.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.syncAndGetProfile();
        } else {
          this.currentUserSubject.next(null);
          return of(null);
        }
      })
    ).subscribe();
  }

  public syncAndGetProfile(): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${environment.api.baseUrl}/auth/sync`, {}).pipe(
      switchMap(() => this.getUserProfile()),
      tap(profile => {
        if (profile) {
          const user: User = {
            ...profile,
            createdAt: '',
            updatedAt: ''
          };
          this.currentUserSubject.next(user);
        }
      }),
      catchError(error => {
        console.error('Error syncing user profile:', error);
        return of(null as any);
      })
    );
  }

  public getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.api.baseUrl}/auth/profile`);
  }

  public getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  public hasRole(roleName: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.some(role => role.name === roleName) || false;
  }

  public hasAnyRole(roleNames: string[]): boolean {
    return roleNames.some(roleName => this.hasRole(roleName));
  }

  public isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  public isBarbero(): boolean {
    return this.hasRole('BARBERO');
  }

  public isVisita(): boolean {
    return this.hasRole('VISITA');
  }

  public login(): void {
    this.auth.loginWithRedirect();
  }

  public logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
    this.currentUserSubject.next(null);
  }

  public get isAuthenticated$(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }

  public get isLoading$(): Observable<boolean> {
    return this.auth.isLoading$;
  }

  public get user$(): Observable<any> {
    return this.auth.user$;
  }

  public getAccessToken(): Observable<string> {
    return this.auth.getAccessTokenSilently();
  }
}