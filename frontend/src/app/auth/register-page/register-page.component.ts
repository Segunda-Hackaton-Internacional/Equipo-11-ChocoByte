import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SmartInputComponent } from "../../components/smart-input/smart-input.component";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, SmartInputComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  public registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  public onSubmit() {
    
  }
}
