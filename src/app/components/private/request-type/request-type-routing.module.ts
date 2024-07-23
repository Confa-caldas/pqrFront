import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestTypeComponent } from './request-type.component';

const routes: Routes = [{ path: '', component: RequestTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestTypeRoutingModule {}
