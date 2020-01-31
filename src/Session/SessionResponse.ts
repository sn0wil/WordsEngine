import { Excercise } from './Excercise';

/**
 * @description Class of session's reaction on an interaction.
 */
export class SessionResponse {
    constructor(
        public sessionProgress: number = 0,
        public wasPrevAnswerCorrect: boolean = false,
        public excercise: Excercise | undefined = undefined
    ) {
    }
}