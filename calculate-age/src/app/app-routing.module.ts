import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalacAgeComponent } from './age/calculate-age.component';

const routes: Routes = [
  {
    path: '',
    component: CalacAgeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
