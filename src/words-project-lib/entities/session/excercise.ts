import { Word } from '../word/word';
/**
 * The type of excercise.
 */
export enum ExcerciseType {
    Radio = 0,
    Text = 1,
    OrderCards = 2,
    Sound = 3
}

/**
 * @description Describes a client excercise.
 */
export class Excercise {
    constructor(
        // The word that should be asked.
        public question: Word,
        // POssible answers for question.
        public answers: Word[] | string[] = [],
        // Should it be translated into English or not.
        public toEng: boolean = true,
        // The type of excercise.
        public type: ExcerciseType = ExcerciseType.Radio
    ) {
    }
}