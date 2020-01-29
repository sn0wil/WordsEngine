import { Excercise } from './Excercise';

/**
 * @description Class of session's reaction on an interaction.
 */
export class SessionResponse {
    constructor(
        public excercise: Excercise,
        public wasPrevAnswerCorrect: boolean = false,
        public sessionProgress: number = 0
    ) {
    }
}