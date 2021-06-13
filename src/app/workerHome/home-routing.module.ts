import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'strike-details/:strikeId',
    loadChildren: () => import('./strikeDetails/strike-details.module').then( m => m.StrikeDetailsPageModule)
  },
  {
    path: 'appeal-form/:strikeId',
    loadChildren: () => import('./strikeDetails/appealForm/appeal-form.module').then( m => m.AppealFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
