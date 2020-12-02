export type AsyncState<T> =
  | {
      status: Status.ERROR;
      data?: undefined;
      error: string;
      actionId?: string;
    }
  | {
      status: Status.SUCCESS;
      data: T;
      error?: undefined;
      actionId?: string;
    }
  | {
      status: Status.PENDING | Status.IDLE;
      data?: undefined;
      error?: undefined;
      actionId?: string;
    };

export enum Status {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  IDLE = 'IDLE',
}
