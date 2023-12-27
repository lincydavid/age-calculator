import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  day: any;
  month: any;
  year: any;
  age: any;

  ageYears: number;
  ageMonths: number;
  ageDays: number;
  error: string;

  constructor() {
    this.error = '';
    this.ageYears = 0;
    this.ageMonths = 0;
    this.ageDays = 0;
  }

  calculateAge() {
    const today: Date = new Date();
    if (this.day && this.month && this.year) {
      const today = new Date();
      const birthDate = new Date(this.year, this.month - 1, this.day); // Months are zero-based

      this.ageYears = today.getFullYear() - birthDate.getFullYear();
      this.ageMonths = today.getMonth() - birthDate.getMonth();
      this.ageDays = today.getDate() - birthDate.getDate();

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
  }
  validateDay(event: any) {
    console.log(event.target.value);
    if(event.target.value > 31){
      this.error = 'Days cannot be greater than 31';
    }
  }
  validateMonth(event: any) {
    console.log(event.target.value);
    if(event.target.value > 12){
      this.error = 'Months cannot be greater than 12';
    }
  }
  validateYear(event: any) {
    console.log(event.target.value);
    if(event.target.value.length!== 4  ){
      this.error = 'Year should be valid';
    }
  }
}

