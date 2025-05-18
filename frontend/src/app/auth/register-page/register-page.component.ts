import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SmartInputComponent } from "../../components/smart-input/smart-input.component";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, SmartInputComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  public email = new FormControl('');
  public password = new FormControl('');
  public confirmPassword = new FormControl('');
  public firstName = new FormControl('');
  public lastName = new FormControl('');

  public onSubmit() {

  }
}
