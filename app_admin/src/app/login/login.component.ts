import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void { }

  /**
   * Handles the login form submission.
   */
  public onLoginSubmit(): void {
    this.formError = ''; // Reset form error
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required. Please try again.';
    } else {
      this.doLogin();
    }
  }

  /**
   * Executes the login operation.
   */
  private async doLogin(): Promise<void> {
    try {
      await this.authenticationService.login(this.credentials);
      this.router.navigateByUrl('/list-trips'); 
    } catch (errorMessage: any) {
      this.formError = 'Login failed. Please try again.';
    }
  }
}
