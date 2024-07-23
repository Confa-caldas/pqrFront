import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantRequestComponent } from './applicant-request.component';

const routes: Routes = [{ path: '', component: ApplicantRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantRequestRoutingModule {}
