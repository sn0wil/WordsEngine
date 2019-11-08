import { Word } from '../../src/Word/Word';

test('checkWordAnswer(string) should return TRUE with passed CORRECT translation', () => {
    const word = new Word();
    word.generalAttributes.translation = 'cat';
    expect(word.checkWordAnswer('cat')).toEqual(true);
});
test('checkWordAnswer(string) should return FALSE with passed INCORRECT translation', () => {
    const word = new Word();
    word.generalAttributes.translation = 'cat';
    expect(word.checkWordAnswer('dog')).toEqual(false);
});
test('checkWordAnswer(Word) should return TRUE with passed CORRECT Word', () => {
    const word = new Word();
    const eqWord = new Word();
    word.generalAttributes.translation = eqWord.generalAttributes.translation = 'cat';
    expect(word.checkWordAnswer(eqWord)).toEqual(true);
});
test('checkWordAnswer(Word) should return TRUE with passed CORRECT Word', () => {
    const word = new Word();
    const eqWord = new Word();
    word.generalAttributes.translation = 'cat';
    eqWord.generalAttributes.translation = 'dog';
    expect(word.checkWordAnswer(eqWord)).toEqual(false);
});