import { Queue } from './Queue';

const getAnArray = () => {
    return ['one', 'two', 'three'];
}

test('pop returns first element and length decreases', () => {
    const array = getAnArray();
    const queue = new Queue(array);
    const firstElement = queue.pop();
    expect(firstElement).toEqual(array[0]);
});

test('pop decreases length', () => {
    const array = getAnArray();
    const queue = new Queue(array);
    queue.pop();
    expect(queue.length).toEqual(array.length - 1);
});

test('getItem returns element by index', () => {
    const array = getAnArray();
    const queue = new Queue(array);
    const index = 1;
    expect(queue.getItem(index)).toEqual(array[index]);
});

test('getItem returns undefined for index >= length', () => {
    const array = getAnArray();
    const queue = new Queue(array);
    expect(queue.getItem(array.length)).toEqual(undefined);
});

test('pushSecond inserts second element', () => {
    const array = getAnArray();
    const queue = new Queue(array);
    const pushingEl = 'after one';
    queue.push(pushingEl);
    expect(queue.getItem(1)).toEqual(pushingEl);
});