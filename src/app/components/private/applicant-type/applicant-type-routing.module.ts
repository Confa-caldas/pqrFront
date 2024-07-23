import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantTypeComponent } from './applicant-type.component';

const routes: Routes = [{ path: '', component: ApplicantTypeComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicantTypeRoutingModule {}
