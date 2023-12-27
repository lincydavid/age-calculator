import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calc-age',
  templateUrl: 'calculate-age.component.html',
  styleUrls: ['calculate-age.component.scss']
})

export class CalacAgeComponent implements OnInit {

  ageCalculateFormGroup: FormGroup;
  invalidForm: boolean;
  ageYears: any;
  ageMonths: any;
  ageDays: any;
  error: string;

  constructor(private fb: FormBuilder) {
    this.invalidForm = false
    this.error = '';
    this.ageYears = null;
    this.ageMonths = null;
    this.ageDays = null;;
    this.ageCalculateFormGroup = this.fb.group(
      {
        day: ['', Validators.required],
        month: ['', Validators.required],
        year: ['', Validators.required]
      }
    )
  }
  ngOnInit(): void {

  }
  onSubmit(value: any) {
    console.log(this.ageCalculateFormGroup.value)
    if (this.ageCalculateFormGroup.valid) {
      console.log('1  ',this.ageCalculateFormGroup.get(['years'])?.value)
      this.ageYears = this.ageCalculateFormGroup.value.year;
      this.ageMonths = this.ageCalculateFormGroup.value.month;
      this.ageDays = this.ageCalculateFormGroup.value.day;
      const today: Date = new Date();
      if (this.ageDays && this.ageMonths && this.ageYears) {
        const today = new Date();
        const birthDate = new Date(this.ageYears, this.ageMonths - 1, this.ageDays); // Months are zero-based

        this.ageYears = today.getFullYear() - birthDate.getFullYear();
        this.ageMonths = today.getMonth() - birthDate.getMonth();
        this.ageDays = today.getDate() - birthDate.getDate();
        console.log('hiii  ', this.ageYears)
        // Adjust for negative months or days
        if (this.ageDays < 0) {
          this.ageMonths--;
          const lastMonthDate: Date = new Date(today.getFullYear(), today.getMonth(), 0);
          this.ageDays += lastMonthDate.getDate();
        }

        if (this.ageMonths < 0) {
          this.ageYears--;
          this.ageMonths += 12;
        }
      }

      console.log(this.ageCalculateFormGroup);
      this.invalidForm = false;
    } else {
      this.invalidForm = true;
    }
  }

}