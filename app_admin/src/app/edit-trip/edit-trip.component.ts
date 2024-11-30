import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  public editForm!: FormGroup;
  submitted = false;
  trip!: Trip;
  message: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
    // Retrieve the tripCode from localStorage
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something went wrong, couldn't find tripCode!");
      this.router.navigate(['']);
      return;
    }
    console.log("EditTripComponent#onInit found tripCode " + tripCode);

    // Initialize the form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ["", Validators.required],
      length: ["", Validators.required],
      start: ["", Validators.required],
      resort: ["", Validators.required],
      perPerson: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
    });

    console.log("Calling TripDataService#getTrip('" + tripCode + "')");

    // Fetch the trip details from the service
    this.tripService.getTrip(tripCode).subscribe(data => {
      if (data) {
        this.editForm.patchValue(data);
        console.log("Form patched with trip data");
      } else {
        console.log("Trip not found");
      }
    }, error => {
      console.log("Error fetching trip: ", error);
    });
  }

  // Method to handle form submission
  public onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.tripService.updateTrip(this.editForm.value).subscribe({
      next: (data) => {
        console.log("Trip updated successfully:", data);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error("Error updating trip:", error);
      }
    });
  }

  // get the form short name to access the form fields
  get f() {
    return this.editForm.controls;
  }
}

