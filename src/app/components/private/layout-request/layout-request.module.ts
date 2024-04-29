import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRequestRoutingModule } from './layout-request-routing.module';
import { LayoutRequestComponent } from './layout-request.component';

@NgModule({
  declarations: [LayoutRequestComponent],
  imports: [CommonModule, LayoutRequestRoutingModule],
})
export class LayoutRequestModule {}
