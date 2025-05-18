import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-smart-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './smart-input.component.html',
  styleUrl: './smart-input.component.css'
})
export class SmartInputComponent {
  @Input() public id: string = '';
  @Input() public type: string = '';
  @Input() public value: string = '';

  public isBtn : boolean = false;

  ngOnInit() {
    if (this.type === "submit") {
      this.value = 'Aceptar';
      this.isBtn = true;
    }
  }
}
