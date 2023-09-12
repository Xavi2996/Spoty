import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent {
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl({}, [Validators.required, Validators.email]),
      password: new FormControl({}, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
    });
  }

  sendLogin() {
    const { email, password } = this.formLogin.value;

    this.authService.sendCredentials(email, password).subscribe(
      (response) => {
        console.log(response);
        console.log('Sesión iniciada correctamente', response);
        // const { tokenSession, data } = response;
        // this.cookie.set('token', tokenSession, 4, '/'); //GUARDAR COOKIE DESDE EL COMPONENTE OSEA EL TOKEN
        this.router.navigate(['/', 'tracks']);
      },
      (err) => {
        this.errorSession = true;
        console.log('Ocurrio un error con tu password');
      }
    );
  }
}
