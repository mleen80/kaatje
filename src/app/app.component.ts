import { Component } from '@angular/core';

import { AsyncState, Status } from '../async/async.model';
import { Data } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public state: AsyncState<Data> = {
    status: Status.PENDING
  };

  public setData(): void {
    this.state = {
      status: Status.SUCCESS,
      data: {
        id: '1',
        description: 'This is a description of an item',
        address: {
          postcode: '1234 AB',
          houseNumber: '1'
        }
      }
    };
  }

  public setError(): void {
    this.state = {
      status: Status.ERROR,
      data: undefined,
      error: 'Things are going wrong...'
    };
  }

  public unsetData(): void {
    this.state = {
      status: Status.PENDING,
      data: undefined
    };
  }
}
