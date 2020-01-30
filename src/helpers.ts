import { plainToClass } from "class-transformer";
import wordsJson from './words.json';
import { Word } from './Word/Word';

/**
 * @description Returns random value between min and max. Both edges are included.
 * @param {number} min Minimum value for random.
 * @param {number} max Maximum value for random.
 * @returns {number} Random value.
 */
export const getRandomNumberFromInterval = (min: number, max: number) => {
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @description Returns the progress of elements that left count in comparison with total count. 
 * @param {number} elementsLeft Number of left elements.
 * @param {number} totalElements Total number of elements.
 * @returns {number} The progress in range 1..100.
 */
export const getProgress = (elementsLeft: number, totalElements: number) => {
    if (elementsLeft === 0 || totalElements === 0) {
        return 100;
    }
    return Math.floor(elementsLeft / totalElements * 100);
}

/**
 * @description Returns an array of test words from words.json.
 */
export const getTestWords = () => plainToClass(Word, wordsJson);