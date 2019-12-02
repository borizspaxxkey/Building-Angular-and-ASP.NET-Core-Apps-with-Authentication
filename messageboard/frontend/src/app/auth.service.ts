import { HttpClient, HttpHeaders, HttpResponse, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  BASE_URL = 'https://localhost:44356/auth';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';

  constructor(private http: HttpClient, private router: Router) {

  }

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get tokenHeader() {
    var header = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY) });
    return header;
  }

  login(loginData) {
    this.http.post(this.BASE_URL + '/login', loginData).subscribe(response => {
      this.authenticate(response);
    });
  }

  register(user) {

    //removes the confirmPassword property from the object before sending to the endpoint
    delete user.confirmPassword;

    this.http.post(this.BASE_URL + '/register', user).subscribe(response => {
      this.authenticate(response);
    });
  }

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  authenticate(response) {
    var authResponse = response;

    if (!authResponse['token']) {
      return;
    }

    localStorage.setItem(this.TOKEN_KEY, authResponse['token'])
    localStorage.setItem(this.NAME_KEY, authResponse['firstName'])
    this.router.navigate(['/']);
  }
}
