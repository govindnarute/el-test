import { Injectable } from "@angular/core";

interface LoginDetails {
  username: string;
  isLoggedIn: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly storageKey = "loginDetails";

  login(username: string): void {
    const loginDetails: LoginDetails = {
      username,
      isLoggedIn: true,
    };

    localStorage.setItem(this.storageKey, JSON.stringify(loginDetails));
  }

  isLoggedIn(): boolean {
    const storedDetails = localStorage.getItem(this.storageKey);

    if (!storedDetails) {
      return false;
    }

    try {
      const loginDetails = JSON.parse(storedDetails) as LoginDetails;
      return loginDetails.isLoggedIn === true && !!loginDetails.username;
    } catch {
      localStorage.removeItem(this.storageKey);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }
}
