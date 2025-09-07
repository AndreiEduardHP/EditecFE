import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { config } from '../../environments/environment'; 
import { LoginResponse, User } from '../../models/IUser';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${config.BASE_URL}/api/Auth/login`;

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private userSubject = new BehaviorSubject<User | null>(null);

  token$ = this.tokenSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('loggedUser');

      this.tokenSubject.next(token);
      this.userSubject.next(user ? JSON.parse(user) as User : null);
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };

    return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('loggedUser', JSON.stringify(response.loggedUser));
        }

        this.tokenSubject.next(response.token);
        this.userSubject.next(response.loggedUser);
      })
    );
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getLoggedUser(): User | null {
    return this.userSubject.value;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedUser');
    }

    this.tokenSubject.next(null);
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
