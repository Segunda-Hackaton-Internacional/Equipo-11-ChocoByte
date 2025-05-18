import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-smart-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './smart-input.component.html',
  styleUrl: './smart-input.component.css'
})
export class SmartInputComponent {
  @Input() public id: string = '';
  @Input() public type: string = '';
  @Input() public value: string = '';
  @Input() public placeholder: string = '';
  @Input() public required: boolean = false;

  @Input() public formControl: FormControl = new FormControl();

  public isBtn : boolean = false;

  ngOnInit() {
    if (this.type === "submit") {
      this.value = 'Aceptar';
      this.isBtn = true;
    }
  }
}
