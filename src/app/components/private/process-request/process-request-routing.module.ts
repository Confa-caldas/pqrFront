import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessRequestComponent } from './process-request.component';

const routes: Routes = [{ path: '', component: ProcessRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessRequestRoutingModule {}
