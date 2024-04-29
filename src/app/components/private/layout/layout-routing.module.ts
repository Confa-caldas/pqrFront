import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { RequestManagerComponent } from '../request-manager/request-manager.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: 'request-manager', component: RequestManagerComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
