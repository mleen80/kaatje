import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RequestStrategy } from '../enums/request-strategy.enum';
import { HandleRequestService } from './handle-request.service';
import { BaseActionType } from '../interfaces';

describe('HandleRequestService', () => {
    let service: HandleRequestService;
    let httpTestingController: HttpTestingController;
    let httpClient: HttpClient;
    type urlAction = BaseActionType<{ url: string }> & { type: string };
    let subject$: Subject<urlAction>;

    const firstAction: urlAction = {
        type: 'request',
        requestStrategy: RequestStrategy.CANCEL,
        payload: {
            url: 'first request'
        }
    };

    const secondAction: urlAction = {
        type: 'request',
        requestStrategy: RequestStrategy.CANCEL,
        payload: {
            url: 'second request'
        }
    };

    const handler = (action: urlAction) => httpClient.get(action.payload.url).pipe(map(_ => action));

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HandleRequestService]
        });

        service = TestBed.inject(HandleRequestService);
        httpTestingController = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
        subject$ = new Subject<urlAction>();
    });

    afterEach(() => {
        httpTestingController.verify({
            // ignoreCancelled: true
        });
    });

    describe('Cancellable requests', () => {
        it('should cancel the first request if a second is dispatched', () => {
            const spy = jasmine.createSpy('request handler');
            service.handle(subject$, handler).subscribe(spy);

            firstAction.requestStrategy = RequestStrategy.CANCEL;
            subject$.next(firstAction);

            secondAction.requestStrategy = RequestStrategy.CANCEL;
            subject$.next(secondAction);

            expect(httpTestingController.expectOne(firstAction.payload.url).cancelled).toBeTruthy();
            httpTestingController.expectOne(secondAction.payload.url).flush({});
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should cancel the first request if a second (Sequence) is dispatched', () => {
            const spy = jasmine.createSpy('request handler');
            service.handle(subject$, handler).subscribe(spy);

            firstAction.requestStrategy = RequestStrategy.CANCEL;
            subject$.next(firstAction);

            secondAction.requestStrategy = RequestStrategy.SEQUENCE;
            subject$.next(secondAction);

            expect(httpTestingController.expectOne('first request').cancelled).toBeTruthy();
            httpTestingController.expectOne('second request').flush({});
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should cancel the first request if a second (Parallel) is dispatched', () => {
            const spy = jasmine.createSpy('request handler');
            service.handle(subject$, handler).subscribe(spy);

            firstAction.requestStrategy = RequestStrategy.CANCEL;
            subject$.next(firstAction);

            secondAction.requestStrategy = RequestStrategy.PARALLEL;
            subject$.next(secondAction);

            expect(httpTestingController.expectOne(firstAction.payload.url).cancelled).toBeTruthy();
            httpTestingController.expectOne(secondAction.payload.url).flush({});
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should cancel the first request if a second (Ignore) is dispatched', () => {
            const spy = jasmine.createSpy('request handler');
            service.handle(subject$, handler).subscribe(spy);

            firstAction.requestStrategy = RequestStrategy.CANCEL;
            subject$.next(firstAction);

            secondAction.requestStrategy = RequestStrategy.IGNORE;
            subject$.next(secondAction);

            expect(httpTestingController.expectOne(firstAction.payload.url).cancelled).toBeTruthy();
            httpTestingController.expectOne(secondAction.payload.url).flush({});
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
    describe('Parallel requests', () => {
        it('should process all requests at the same time', () => {
            const spy = jasmine.createSpy('request handler');
            service.handle(subject$, handler).subscribe(spy);

            firstAction.requestStrategy = RequestStrategy.PARALLEL;
            subject$.next(firstAction);

            secondAction.requestStrategy = RequestStrategy.PARALLEL;
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
            service.handle(subject$, handler).subscribe(spy);

            firstAction.requestStrategy = RequestStrategy.SEQUENCE;
            subject$.next(firstAction);

            secondAction.requestStrategy = RequestStrategy.SEQUENCE;
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

    describe('Ignore requests', () => {
        it('should process the first request and ignore all later requests', () => {
            const spy = jasmine.createSpy('request handler');
            service.handle(subject$, handler).subscribe(spy);

            firstAction.requestStrategy = RequestStrategy.IGNORE;
            subject$.next(firstAction);

            secondAction.requestStrategy = RequestStrategy.IGNORE;
            subject$.next(secondAction);

            httpTestingController.expectNone(secondAction.payload.url);
            httpTestingController.expectOne(firstAction.payload.url).flush({});

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('Default requestStrategy', () => {
        it('should default to cancel when no requestStrategy is specified', () => {
            const spy = jasmine.createSpy('request handler');
            service.handle(subject$, handler).subscribe(spy);

            firstAction.requestStrategy = undefined;
            subject$.next(firstAction);

            const firstRequest = httpTestingController.expectOne(firstAction.payload.url);
            firstRequest.flush({});
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({ requestStrategy: RequestStrategy.CANCEL }));
        });
    });
});
