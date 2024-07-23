import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRequestComponent } from './layout-request.component';
import { CreateRequestComponent } from '../create-request/create-request.component';
import { RequestFormComponent } from '../request-form/request-form.component';

const routes: Routes = [  {
  path: '',
  component: LayoutRequestComponent,
  children: [{ path: 'create-request', component: CreateRequestComponent}],
},
{
path: '',
component: LayoutRequestComponent,
children: [{ path: 'request-form', component: RequestFormComponent}],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRequestRoutingModule {}
