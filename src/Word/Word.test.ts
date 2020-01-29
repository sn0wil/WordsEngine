import { Word, WordType } from './Word';

const getTestWord = () => {
    const testWord = new Word();
    testWord.id = 1;
    testWord.translation = 'Translation';
    testWord.text = 'Text';
    return testWord;
};

test('checkAnswer should return TRUE if words are equal', () => {
    const testWord = getTestWord();
    expect(testWord.checkAnswer(testWord)).toEqual(true);
});

test('checkAnswer should return TRUE if answer is correct', () => {
    const testWord = getTestWord();
    expect(testWord.checkAnswer(testWord.translation)).toEqual(true);
});

test('incrementCorrectCounter should increment introductionCorrectAnswers for Intro word', () => {
    const testWord = getTestWord();
    testWord.incrementCorrectCounter();
    expect(testWord.introductionCorrectAnswers).toEqual(1);
});

test('incrementCorrectCounter should set repeatingExpirationDate for Repeating word', () => {
    const testWord = getTestWord();
    testWord.type = WordType.Repeating;
    testWord.incrementCorrectCounter();
    expect(testWord.repeatingExpirationDate).not.toEqual(null);
});
