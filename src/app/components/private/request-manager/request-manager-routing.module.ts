import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestManagerComponent } from './request-manager.component';

const routes: Routes = [{ path: '', component: RequestManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestManagerRoutingModule {}
