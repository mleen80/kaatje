import { createBaseAction } from './base-action.factory';

describe('base action factory', () => {
    it('should return action with given type', () => {
        const actionFn = createBaseAction<{ url: string }>('test');
        const action = actionFn({ actionId: '1', payload: { url: 'test url' } });
        expect(action.type).toBe('test');
        expect(action.payload.url).toBe('test url');
        expect(action.actionId).toBe('1');
    });

    it('should return action with null payload when no payload is specified', () => {
        const actionFn = createBaseAction('test');
        const action = actionFn();
        expect(action.payload).toBeNull();
    });
});
