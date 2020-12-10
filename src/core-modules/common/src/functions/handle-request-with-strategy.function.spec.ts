import { BaseAction } from '../actions/base.action';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { handleRequestWithStrategy } from './handle-request-with-strategy.function';
import { TestBed } from '@angular/core/testing';
import { RequestStrategy } from '../enums/request-strategy.enum';

describe('Handle request with strategy fn', () => {
    let httpTestingController: HttpTestingController;
    let httpClient: HttpClient;
    let subject$: Subject<BaseAction<{ url: string }>>;

    class RequestAction extends BaseAction<{ url: string }> {
        type = 'request';
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
        subject$ = new Subject<BaseAction<{ url: string }>>();
    });

    afterEach(() => {
        httpTestingController.verify({
            // ignoreCancelled: true
        });
    });

    describe('Cancellable requests', () => {
        it('should cancel the first request if a second is dispatched', () => {
            const spy = jasmine.createSpy('request handler');

            handleRequestWithStrategy(subject$, action =>
                httpClient.get(action.payload.url).pipe(map(() => new RequestAction()))
            ).subscribe(spy);

            const firstAction = new RequestAction({
                requestStrategy: RequestStrategy.CANCEL,
                payload: {
                    url: 'first cancellable request'
                }
            });
            subject$.next(firstAction);

            const secondAction = new RequestAction({
                requestStrategy: RequestStrategy.CANCEL,
                payload: {
                    url: 'second cancellable request'
                }
            });
            subject$.next(secondAction);

            expect(httpTestingController.expectOne(firstAction.payload.url).cancelled).toBeTruthy();

            httpTestingController.expectOne(secondAction.payload.url).flush({});

            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should cancel the first request if a second (Sequence) is dispatched', () => {
            const spy = jasmine.createSpy('request handler');

            handleRequestWithStrategy(subject$, action =>
                httpClient.get(action.payload.url).pipe(map(() => new RequestAction()))
            ).subscribe(spy);

            const firstAction = new RequestAction({
                requestStrategy: RequestStrategy.CANCEL,
                payload: {
                    url: 'first cancellable request'
                }
            });
            subject$.next(firstAction);

            const secondAction = new RequestAction({
                requestStrategy: RequestStrategy.SEQUENCE,
                payload: {
                    url: 'second cancellable request'
                }
            });
            subject$.next(secondAction);

            expect(httpTestingController.expectOne('first cancellable request').cancelled).toBeTruthy();

            httpTestingController.expectOne('second cancellable request').flush({});

            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should cancel the first request if a second (Parallel) is dispatched', () => {
            const spy = jasmine.createSpy('request handler');

            handleRequestWithStrategy(subject$, action =>
                httpClient.get(action.payload.url).pipe(map(() => new RequestAction()))
            ).subscribe(spy);

            const firstAction = new RequestAction({
                requestStrategy: RequestStrategy.CANCEL,
                payload: {
                    url: 'first cancellable request'
                }
            });
            subject$.next(firstAction);

            const secondAction = new RequestAction({
                requestStrategy: RequestStrategy.PARALLEL,
                payload: {
                    url: 'second cancellable request'
                }
            });
            subject$.next(secondAction);

            expect(httpTestingController.expectOne(firstAction.payload.url).cancelled).toBeTruthy();

            httpTestingController.expectOne(secondAction.payload.url).flush({});

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
    describe('Parallel requests', () => {
        it('should process all requests at the same time', () => {
            const spy = jasmine.createSpy('request handler');

            handleRequestWithStrategy(subject$, action =>
                httpClient.get(action.payload.url).pipe(map(() => new RequestAction()))
            ).subscribe(spy);

            const firstAction = new RequestAction({
                requestStrategy: RequestStrategy.PARALLEL,
                payload: {
                    url: 'first parallel request'
                }
            });
            subject$.next(firstAction);

            const secondAction = new RequestAction({
                requestStrategy: RequestStrategy.PARALLEL,
                payload: {
                    url: 'second parallel request'
                }
            });
            subject$.next(secondAction);

            const firstRequest = httpTestingController.expectOne(firstAction.payload.url);
            const secondRequest = httpTestingController.expectOne(secondAction.payload.url);

            firstRequest.flush({});
            secondRequest.flush({});

            expect(spy).toHaveBeenCalledTimes(2);
        });
    });
    describe('Sequence requests', () => {
        it('should process all requests at the same time', () => {
            const spy = jasmine.createSpy('request handler');

            handleRequestWithStrategy(subject$, action =>
                httpClient.get(action.payload.url).pipe(map(() => new RequestAction()))
            ).subscribe(spy);

            const firstAction = new RequestAction({
                requestStrategy: RequestStrategy.SEQUENCE,
                payload: {
                    url: 'first parallel request'
                }
            });
            subject$.next(firstAction);

            const secondAction = new RequestAction({
                requestStrategy: RequestStrategy.SEQUENCE,
                payload: {
                    url: 'second parallel request'
                }
            });
            subject$.next(secondAction);

            const firstRequest = httpTestingController.expectOne(firstAction.payload.url);
            httpTestingController.expectNone(secondAction.payload.url);

            firstRequest.flush({});
            expect(spy).toHaveBeenCalledTimes(1);

            const secondRequest = httpTestingController.expectOne(secondAction.payload.url);
            secondRequest.flush({});
            expect(spy).toHaveBeenCalledTimes(2);
        });
    });
});
