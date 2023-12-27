import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/shared/validation-error/shared.module';
import { AgeModule } from './age/age.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    AgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
