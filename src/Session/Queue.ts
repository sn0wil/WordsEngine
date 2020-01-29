/**
 * @description Basic realisation of queue for session.
 */
export class Queue<T> {
    private elements: T[];

    public get length() : number {
        return this.elements.length;
    }
    
    constructor(elements: Array<T>) {
        this.elements = [...elements];
    }

    /**
     * @description Removes first element and returns it.
     * @returns {T|undefined} The first element in queue or undefined value. 
     */
    pop(): T | undefined {
        return this.elements.shift();
    }

    /**
     * @description Pushes an element into second position. It needs for learning algorithm.
     * @param {T} element The element that should be pushed. 
     */
    pushSecond(element: T): void {
        const pushingPosition = this.elements.length < 2 ? 0 : 1;
        this.elements.splice(pushingPosition, 0, element);
    }

    /**
     * @description Returns element by index. In case of no element by index returns undefined.
     * @param {T|index} index Element from queue by index.
     */
    getItem(index: number): T|undefined {
        if (index > this.elements.length + 1) {
            return undefined;
        }
        return this.elements[index];
    }
}