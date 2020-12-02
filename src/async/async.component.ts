import { Component, ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { AsyncState, Status } from './async.model';

// tslint:disable-next-line: directive-selector
@Directive({selector: 'ng-template[success]'})
export class AsyncSuccessDirective<T> {
  constructor(public templateRef: TemplateRef<{data: T}>) {}
}

// tslint:disable-next-line: directive-selector
@Directive({selector: 'ng-template[error]'})
export class AsyncErrorDirective {
  constructor(public templateRef: TemplateRef<{error: string}>) {}
}

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html'
})
export class AsyncComponent<T> {
  @Input()
  public asyncState!: AsyncState<T>;
  public Status = Status;

  @ContentChild(AsyncSuccessDirective, {read: TemplateRef})
  public successTmpl!: TemplateRef<AsyncSuccessDirective<T>>;
  @ContentChild(AsyncErrorDirective, {read: TemplateRef})
  public errorTmpl!: TemplateRef<AsyncErrorDirective>;
}
