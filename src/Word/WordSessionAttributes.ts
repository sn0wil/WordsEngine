export class WordSessionAttributes {
    public currectAnswers: number = 0;
    public incorrectAnswers: number = 0;
    clear() {
        this.currectAnswers = this.incorrectAnswers = 0;
    }
}