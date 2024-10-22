import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {

  constructor(private router: Router, private tripService: TripDataService) { }

  ngOnInit(): void {
    // Initialization code
  }

  // Additional methods for deleting trips
}

