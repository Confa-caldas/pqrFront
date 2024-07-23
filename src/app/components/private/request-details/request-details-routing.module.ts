import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestDetailsComponent } from './request-details.component';

const routes: Routes = [{ path: '', component: RequestDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestDetailsRoutingModule {}
