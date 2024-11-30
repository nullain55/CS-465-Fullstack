import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public formError: string = '';
  public credentials: { email: string; password: string } = {
    email: '',
    password: ''
  };

  constructor() { }

  ngOnInit(): void { }

  /**
   * Handles form submission for login.
   */
  public onLoginSubmit(event: Event): void {
    event.preventDefault();

    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required.';
    } else {
      // Perform login logic here
    }
  }
}
