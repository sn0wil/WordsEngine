/**
 * Additional class for word temporary attributes in a session.
 */
export class WordSessionAttributes {
    public currectAnswers: number = 0;
    public incorrectAnswers: number = 0;
    clear(): void {
        this.currectAnswers = this.incorrectAnswers = 0;
    }
}