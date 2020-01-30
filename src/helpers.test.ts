import { getRandomNumberFromInterval, getProgress } from './helpers';

describe('getRandomNumberFromInterval', () => {
    it('should return value beetween min and max', () => {
        const min = 1;
        const max = 10;
        const randomNumber = getRandomNumberFromInterval(min, max);
        expect(randomNumber <= max && randomNumber >= min).toEqual(true);
    });
    
    it('should return value beetween min+1 and max-1 and not equal min or max', () => {
        const min = 1;
        const max = 10;
        const randomNumber = getRandomNumberFromInterval(min + 1, max - 1);
        expect(randomNumber < max && randomNumber > min).toEqual(true);
    });
    
    it('should change min and max if min > max and return value beetween min and max', () => {
        const min = 10;
        const max = 1;
        const randomNumber = getRandomNumberFromInterval(min, max);
        expect(randomNumber >= max && randomNumber <= min).toEqual(true);
    });
});

describe('getProgress', () => {
    it('should return progress equals 25 for 5 of 20', () => {
        const left = 5;
        const total = 20;
        const result = 25;
        expect(getProgress(left, total)).toEqual(result);
    });

    it('should return progress equals 100 for 0 of 20', () => {
        const left = 0;
        const total = 20;
        const result = 100;
        expect(getProgress(left, total)).toEqual(result);
    });

    it('should return progress equals 100 for 10 of 0', () => {
        const left = 10;
        const total = 0;
        const result = 100;
        expect(getProgress(left, total)).toEqual(result);
    });
});