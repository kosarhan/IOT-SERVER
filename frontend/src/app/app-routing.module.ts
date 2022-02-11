import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { NodeComponent } from './node/node.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'node/:id', component: NodeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const AppRoutingModule = RouterModule.forRoot(routes);