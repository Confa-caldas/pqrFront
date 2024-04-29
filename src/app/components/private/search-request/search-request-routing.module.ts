import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchRequestComponent } from './search-request.component';

const routes: Routes = [{ path: '', component: SearchRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRequestRoutingModule {}
