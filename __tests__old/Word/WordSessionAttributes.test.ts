import { WordSessionAttributes } from '../../src_old/Word/WordSessionAttributes';

test('clear should reset currectAnswers and incorrectAnswers values', () => {
    const sessionAttributes = new WordSessionAttributes();
    sessionAttributes.currectAnswers = 1;
    sessionAttributes.incorrectAnswers = 1;
    sessionAttributes.clear();
    expect([0, 0]).toEqual([sessionAttributes.currectAnswers, sessionAttributes.incorrectAnswers]);
});