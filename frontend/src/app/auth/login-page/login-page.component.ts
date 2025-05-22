import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersAdapter } from '../../../lib/auth/usersAdapter';
import { CommonModule } from '@angular/common'; // 👈 Importa esto

@Component({
  selector: 'app-login-page',
  standalone: true,
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
}
