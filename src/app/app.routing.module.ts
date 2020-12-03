import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabled',
        paramsInheritanceStrategy: 'always',
        relativeLinkResolution: 'corrected',
        scrollPositionRestoration: 'enabled',
        onSameUrlNavigation: 'reload'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
