import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsReportComponent } from './requests-report.component';

const routes: Routes = [{ path: '', component: RequestsReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsReportRoutingModule {}
