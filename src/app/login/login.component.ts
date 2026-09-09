import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  staticUsername = 'admin';
  staticPassword = 'admin123';

  constructor(private router: Router) {}

  login(): void {
    if (this.username === this.staticUsername && this.password === this.staticPassword) {
      this.errorMessage = '';
      this.router.navigate(['/voter']);
      return;
    }

    this.errorMessage = 'Invalid username or password.';
  }
}
