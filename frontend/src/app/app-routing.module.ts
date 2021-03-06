import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { IndexComponent } from './index/index.component';
import { NodeComponent } from './node/node.component';
import { NodeEditComponent } from './node-edit/node-edit.component';
import { NodeAlertComponent } from './node-alert/node-alert.component';
import { AlertComponent } from './alert/alert.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'node/:id', component: NodeComponent },
  { path: 'node/:id/edit', component: NodeEditComponent },
  { path: 'node-alert/:id', component: NodeAlertComponent },
  { path: 'alert', component: AlertComponent },
  { path: '*', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const AppRoutingModule = RouterModule.forRoot(routes);