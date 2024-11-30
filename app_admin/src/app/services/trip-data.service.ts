import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public addTrip(formData: Trip): Observable<Trip> {
    console.log("Inside TripDataService#addTrip");

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.storage.getItem("travlr-token")}`,
    });

    return this.http
      .post<Trip>(this.tripUrl, formData, { headers })
      .pipe(catchError(this.handleError));
  }

  public getTrip(tripCode: string): Observable<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      .get<Trip>(this.tripUrl + tripCode)
      .pipe(catchError(this.handleError));
  }

  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get<Trip[]>(this.tripUrl)
      .pipe(catchError(this.handleError));
  }

  public updateTrip(formData: Trip): Observable<Trip> {
    console.log("Inside TripDataService#updateTrip");

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.storage.getItem("travlr-token")}`,
    });

    return this.http
      .put<Trip>(this.tripUrl + formData.code, formData, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Something has gone wrong', error); // For demo purposes only
    return throwError(() => new Error(error.message || error));
  }

  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const url: string = `${this.apiBaseUrl}${urlPath}`;
    return this.http
      .post<AuthResponse>(url, user)
      .pipe(catchError(this.handleError));
  }
}
