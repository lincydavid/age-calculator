import { NgModule } from '@angular/core';
import { CalacAgeComponent } from './calculate-age.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    CalacAgeComponent
  ],
  exports: [
    CalacAgeComponent
  ]
})
export class AgeModule {}