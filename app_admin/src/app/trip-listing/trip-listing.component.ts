import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent, RouterModule],  // Import RouterModule for navigation
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];  // Use Trip model for typing the trips array
  message: string = '';  // Declare message property to store status messages

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {
    console.log('trip-listing constructor');
  }

  // Navigate to add-trip route
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // Method to fetch trips from the service
  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;
        if (value.length > 0) {
          this.message = `There are ${value.length} trips available.`;
        } else {
          this.message = 'There were no trips retrieved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
        this.message = 'Error retrieving trips from the database';
      }
    });
  }

  // Call the method to fetch trips on initialization
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}

