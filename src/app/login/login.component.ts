import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  username = "";
  password = "";
  errorMessage = "";

  staticUsername = "admin";
  staticPassword = "admin123";

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/voter"]);
    }
  }

  login(): void {
    if (
      this.username === this.staticUsername &&
      this.password === this.staticPassword
    ) {
      this.errorMessage = "";
      this.authService.login(this.username);
      this.router.navigate(["/voter"]);
      return;
    }

    this.errorMessage = "Invalid username or password.";
  }
}
