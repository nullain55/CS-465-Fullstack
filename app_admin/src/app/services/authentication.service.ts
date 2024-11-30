import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  // Retrieve the token from localStorage
  public getToken(): string | null {
    return this.storage.getItem('travlr-token');
  }

  // Save the token to localStorage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Login a user by calling the TripDataService and returning the AuthResponse
  public login(user: User): Observable<AuthResponse> {
    return this.tripDataService.login(user).pipe(
      map((authResp: AuthResponse) => {
        this.saveToken(authResp.token);
        return authResp;
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    );
  }

  // Register a new user by calling the TripDataService
  public register(user: User): Observable<AuthResponse> {
    return this.tripDataService.register(user).pipe(
      map((authResp: AuthResponse) => {
        this.saveToken(authResp.token);
        return authResp;
      }),
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => new Error('Registration failed. Please try again.'));
      })
    );
  }

  // Log the user out by removing the token from localStorage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Check if the user is logged in by validating the token
  public isLoggedIn(): boolean {
    const token: string | null = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > (Date.now() / 1000);  // Check if the token has expired
      } catch (e) {
        console.error('Token decoding failed:', e);
        return false;
      }
    }
    return false;
  }

  // Get the current user from the token
  public getCurrentUser(): User | undefined {
    if (this.isLoggedIn()) {
      const token: string | null = this.getToken();
      if (token) {
        try {
          const { email, name } = JSON.parse(atob(token.split('.')[1]));
          return { email, name } as User;
        } catch (e) {
          console.error('Failed to parse token:', e);
        }
      }
    }
    return undefined;  // Return undefined if the user is not logged in
  }
}
