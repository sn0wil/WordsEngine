import { WordGeneralAttributes } from './WordGeneralAttributes';
import { IWordLearningAttributes } from './WordLearningAttributes';
import { WordSessionAttributes } from './WordSessionAttributes';

export class Word {
    public generalAttributes: WordGeneralAttributes = new WordGeneralAttributes();
    public learningAttributes!: IWordLearningAttributes;
    public sessionAttributes: WordSessionAttributes = new WordSessionAttributes();
    checkWordAnswer(answer: (Word | string)): boolean {
        if (typeof answer === 'string') {
            return this.generalAttributes.translation === answer;
        }
        return this.generalAttributes.translation === (answer as Word).generalAttributes.translation;
    }
}