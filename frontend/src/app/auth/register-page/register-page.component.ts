import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SmartInputComponent } from "../../components/smart-input/smart-input.component";
import { passwordConfirmationValidator } from '../../../lib/form/validators/passConfirm';
import { CommonModule } from '@angular/common';
import { UsersAdapter } from '../../../lib/auth/usersAdapter';
import { updateProfile } from 'firebase/auth';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, SmartInputComponent, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private formBuilder = inject(FormBuilder);
  private usersAdapter = UsersAdapter.getInstance();

  public registrado = false;
  public error = false;
  public errorMessage = '';

  public registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: [''],
  }, {
    validators: [
      passwordConfirmationValidator('password', 'confirmPassword')
    ]
  });

  public onSubmit() {
    this.usersAdapter.registerUser(
      this.registerForm.value.email as string,
      this.registerForm.value.password as string
    ).then((result) => {
      if (result && result.result && result.user) {
        this.registrado = true;
        this.error = false;
        updateProfile(result.user, {
          displayName: `${this.registerForm.value.firstName} ${this.registerForm.value.lastName}`,
        })
      } else {
        this.registrado = false;
        this.error = true;
        this.errorMessage = result.message;
        console.error('Error registering user:', result.message);
      }
    });
  }
}
