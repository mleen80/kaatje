import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConfiguration } from './app.model';
import { LeegstandComponent } from './leegstand/leegstand.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule)},
      {path: 'leegstand/:leegstand', component: LeegstandComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, routeConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
