import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validate-input',
  templateUrl: 'validation-error.component.html'
})

export class ValidateInputsComponent {
  @Input() error: any;
  @Input() control: any;
  constructor() { }

}