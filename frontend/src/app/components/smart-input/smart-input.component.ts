import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-smart-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './smart-input.component.html',
  styleUrl: './smart-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmartInputComponent),
      multi: true,
    }
  ],
})
export class SmartInputComponent implements ControlValueAccessor {
  @Input() public id: string = '';
  @Input() public type: string = '';
  @Input() public value: string = '';
  @Input() public placeholder: string = '';
  @Input() public required: boolean = false;
  @Input() public disabled: boolean = false;

  public isBtn: boolean = false;
  
  public onChange = (value: string) => { };
  public onTouched = () => { };

  ngOnInit() {
    if (this.type === "submit") {
      this.value = 'Aceptar';
      this.isBtn = true;
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
