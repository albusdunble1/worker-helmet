import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StrikeDetailsPage } from './strike-details.page';

const routes: Routes = [
  {
    path: '',
    component: StrikeDetailsPage
  },
  {
    path: 'appeal-form',
    loadChildren: () => import('./appeal-form/appeal-form.module').then( m => m.AppealFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StrikeDetailsPageRoutingModule {}
