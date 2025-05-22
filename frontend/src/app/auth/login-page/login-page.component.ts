import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersAdapter } from '../../../lib/auth/usersAdapter';
import { CommonModule } from '@angular/common'; // 👈 Importa esto
>>>>>>> respaldo-login-funcional

@Component({
  selector: 'app-login-page',
  standalone: true,
<<<<<<< HEAD
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

=======
  imports: [ReactiveFormsModule, CommonModule], // 👈 Agrega aquí
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  adapter = UsersAdapter.getInstance();

  constructor(private fb: FormBuilder, private router: Router) {
    console.log('✅ LoginPageComponent cargado');

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login() {
    const { email, password } = this.loginForm.value;
    const result = await this.adapter.loginUser(email, password);

    if (result.result) {
      this.router.navigate(['/products']);
    } else {
      this.errorMessage = result.message;
    }
  }
>>>>>>> respaldo-login-funcional
}
