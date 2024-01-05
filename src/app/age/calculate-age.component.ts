import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calc-age',
  templateUrl: 'calculate-age.component.html',
  styleUrls: ['calculate-age.component.scss']
})

export class CalacAgeComponent {

  formGroup: FormGroup;

  invalidForm: boolean;
  ageYears?: number | undefined;
  ageMonths?: number | undefined;
  ageDays?: number | undefined;

  error = '';
  daysToValidate: number | undefined;

  constructor(private fb: FormBuilder) {

    this.invalidForm = false
    this.formGroup = this.fb.group(
      {
        day: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
        month: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
        year: [null, [Validators.required, Validators.min(1900), this.yearValidator]]
      }
    );
    this.month?.valueChanges.subscribe(newMonth => {
      this.getDaysOfMonth(newMonth);
      this.day?.setValidators([Validators.required, Validators.min(1), Validators.max(this.daysToValidate ? this.daysToValidate : 0)]);
      this.day?.updateValueAndValidity();
    })
  }

  get day() {
    return this.formGroup.get(['day']);
  }

  get month() {
    return this.formGroup.get(['month']);
  }
  get year() {
    return this.formGroup.get(['year']);
  }

  yearValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const currentYear = new Date().getFullYear();
    const enteredYear = control.value;
    if (enteredYear && (enteredYear < 1900 || enteredYear > currentYear)) {
      return { 'invalidYear': true };
    }
    return null;
  }

  getDaysOfMonth(month: number) {
    const daysInMonth = new Date(this.year?.value, month, 0).getDate();
    this.daysToValidate = daysInMonth;
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.invalidForm = false;
      this.ageYears = this.formGroup.value.year;
      this.ageMonths = this.formGroup.value.month;
      this.ageDays = this.formGroup.value.day;

      if (this.ageDays && this.ageMonths && this.ageYears) {
        const today = new Date();
        const birthDate = new Date(this.ageYears, this.ageMonths - 1, this.ageDays); // Months are zero-based

        this.ageYears = today.getFullYear() - birthDate.getFullYear();
        this.ageMonths = today.getMonth() - birthDate.getMonth();
        this.ageDays = today.getDate() - birthDate.getDate();

        if (this.ageDays < 0) {
          this.ageMonths--;
          const lastMonthDate: Date = new Date(today.getFullYear(), today.getMonth(), 0);
          this.ageDays += lastMonthDate.getDate();
        }

        if (this.ageMonths < 0) {
          this.ageYears--;
          this.ageMonths += 12;
        }
      } else {
        this.ageYears = 0;
        this.ageMonths = 0;
        this.ageDays = 0;
      }
    } else {
      this.invalidForm = true;
      this.ageYears = 0;
        this.ageMonths = 0;
        this.ageDays = 0;
    }
  }
}