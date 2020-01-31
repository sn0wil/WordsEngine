/**
 * @description Basic realisation of queue for session.
 */
export class Queue<T> {
    private _elements: T[];

    public get length(): number {
        return this._elements.length;
    }

    constructor(elements: Array<T>) {
        this._elements = [...elements];
    }

    /**
     * @description Removes first element and returns it.
     * @returns {T|undefined} The first element in queue or undefined value. 
     */
    pop(): T | undefined {
        return this._elements.shift();
    }

    /**
     * @description Pushes an element into second position as default. It needs for learning algorithm.
     * @param {T} element The element that should be pushed. 
     * @param {number} position The position to push. 
     */
    push(element: T, position: number = 1): void {
        const pushingPosition = this._elements.length < position + 1 ? this._elements.length : position;
        this._elements.splice(pushingPosition, 0, element);
    }

    /**
     * @description Returns element by index. In case of no element by index returns undefined.
     * @param {T|index} index Element from queue by index.
     */
    getItem(index: number): T | undefined {
        if (index > this._elements.length + 1) {
            return undefined;
        }
        return this._elements[index];
    }

    getCopy(): Queue<T> {
        return new Queue<T>(this._elements);
    }
}