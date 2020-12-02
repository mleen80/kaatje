import { ToDataPipe } from './to-data.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AsyncComponent, AsyncErrorDirective, AsyncSuccessDirective } from '../async/async.component';

const DIRECTIVES = [AsyncComponent, AsyncErrorDirective, AsyncSuccessDirective, ToDataPipe]

@NgModule({
  declarations: DIRECTIVES,
  imports: [CommonModule],
  exports: DIRECTIVES,
})
export class AsyncModule { }
