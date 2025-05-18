import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SmartInputComponent } from "../../components/smart-input/smart-input.component";
import { passwordConfirmationValidator } from '../../../lib/form/validators/passConfirm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, SmartInputComponent, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private formBuilder = inject(FormBuilder);

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

  }
}
