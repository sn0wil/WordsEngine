import { WordSessionAttributes } from "./wordSessionAttributes";
/**
 * @description enum for word type. It can be in 2 states: Introduction and Repeating.
 */
export enum WordType {
    Intro = 0,
    Repeating = 1
}

/**
 * @description The class of representation of a word.
 */
export class Word {
    // General attributes of the word.
    public id!: number;
    public text!: string;
    public translation!: string;
    public description!: string;
    public transcription!: string;
    public examples!: string[];

    // Its type.
    public type: WordType = WordType.Intro;

    // Atrributes for learning.
    public introductionCorrectAnswers: number = 0;
    public repeatingExpirationDate!: Date | null;

    // Session temporary attributes for a word. It will be initialized in a session.
    public sessionAttributes: WordSessionAttributes | undefined;

    /**
     * Method for checking of correctness of the current word.
     * @param {Word|string} answer 
     */
    checkAnswer(answer: (Word | string)): boolean {
        if (typeof answer === 'string') {
            return this.text === answer || this.translation === answer;
        } else {
            return this.id === answer.id;
        }
    }

    /**
     * @description Self-increment of correctness attributes for current word.
     */
    incrementCorrectCounter(): void {
        if (this.type == WordType.Intro) {
            this.introductionCorrectAnswers++;
            //TODO: Change type if correct answers equal or more needed count.
        } else {
            const currentDate = new Date(Date.now());
            currentDate.setDate(currentDate.getDate() + 5);
            this.repeatingExpirationDate = currentDate;
        }
    }
}