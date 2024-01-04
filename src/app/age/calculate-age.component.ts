import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calc-age',
  templateUrl: 'calculate-age.component.html',
  styleUrls: ['calculate-age.component.scss']
})

export class CalacAgeComponent {

  ageCalculateFormGroup: FormGroup;
  invalidForm: boolean;
  ageYears = 0;
  ageMonths = 0;
  ageDays = 0;
  error = '';

  constructor(private fb: FormBuilder) {
    this.invalidForm = false
    this.ageCalculateFormGroup = this.fb.group(
      {
        day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
        month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
        year: ['', [Validators.required, this.yearValidator]]
      }
    )
  }

  yearValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const currentYear = new Date().getFullYear();
    const enteredYear = control.value;
    if (enteredYear && (enteredYear < 1900 || enteredYear > currentYear)) {
      return { 'invalidYear': true };
    }
    return null;
  }

  validateDaysForFeb() {
    if (this.ageDays && this.ageMonths) {
      const enteredDay = this.ageDays;
      const enteredMonth = this.ageMonths;
      const expectedDays = this.validateFebruaryDays();
      if (enteredMonth && (enteredMonth === 2 && enteredDay > expectedDays)) {
        console.log('expected days ',expectedDays)
        this.ageCalculateFormGroup.get(['day'])?.clearValidators()
        this.ageCalculateFormGroup.get(['day'])?.setValidators([Validators.required,Validators.min(1),Validators.max(expectedDays)]);
        this.ageCalculateFormGroup.get(['day'])?.updateValueAndValidity();
        this.ageCalculateFormGroup.get(['day'])?.markAsTouched()
        this.invalidForm = true;
        this.ageYears = 0;
        this.ageMonths = 0;
        this.ageDays = 0;
      }
    }
  }



  onSubmit() {
    if (this.ageCalculateFormGroup.valid) {
      this.invalidForm = false;
      this.ageYears = this.ageCalculateFormGroup.value.year;
      this.ageMonths = this.ageCalculateFormGroup.value.month;
      this.ageDays = this.ageCalculateFormGroup.value.day;
      this.validateDaysForFeb();
      // this.ageYears = 0;
      // this.ageMonths = 0;
      // this.ageDays = 0;
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
      } else{
        this.ageYears = 0;
        this.ageMonths = 0;
        this.ageDays = 0;
      }
    } else {
      this.invalidForm = true;
    }
  }
  validateFebruaryDays(){
    if (this.isLeapYear(this.ageYears)) {
      return 29;  // February has 29 days in a leap year
    } else {
      return 28;  // February has 28 days in a common year
    }
  }
  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
}