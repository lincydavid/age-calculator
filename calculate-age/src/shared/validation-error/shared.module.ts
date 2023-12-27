import { NgModule } from "@angular/core";
import { ValidateInputsComponent } from "./validation-error.component";
import { CommonModule } from '@angular/common';
@NgModule({

  declarations:[
    ValidateInputsComponent
  ],
  exports:[
    ValidateInputsComponent
  ],
  imports: [
    CommonModule,
  ],
})
export class SharedModule{}