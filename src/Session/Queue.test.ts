import { Queue } from './Queue';

const getAnArray = () => {
    return ['one', 'two', 'three'];
}

describe('pop', () => {
    it('returns first element and length decreases', () => {
        const array = getAnArray();
        const queue = new Queue(array);
        const firstElement = queue.pop();
        expect(firstElement).toEqual(array[0]);
    });

    it('decreases length', () => {
        const array = getAnArray();
        const queue = new Queue(array);
        queue.pop();
        expect(queue.length).toEqual(array.length - 1);
    });
});

describe('getItem', () => {
    it('returns element by index', () => {
        const array = getAnArray();
        const queue = new Queue(array);
        const index = 1;
        expect(queue.getItem(index)).toEqual(array[index]);
    });

    it('returns undefined for index >= length', () => {
        const array = getAnArray();
        const queue = new Queue(array);
        expect(queue.getItem(array.length)).toBeUndefined();
    });
});

describe('push', () => {
    test('inserts second element as default', () => {
        const array = getAnArray();
        const queue = new Queue(array);
        const pushingEl = 'after one';
        queue.push(pushingEl);
        expect(queue.getItem(1)).toEqual(pushingEl);
    });

    const position = 3;
    test(`inserts ${position} element`, () => {
        const array = getAnArray();
        const queue = new Queue(array);
        const pushingEl = 'some element';
        queue.push(pushingEl, position);
        expect(queue.getItem(position)).toEqual(pushingEl);
    });
});