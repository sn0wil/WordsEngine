import { Word } from './Word/Word';
import { WordRepitionMode } from './enums';
import {
    WordLearningAttributesIntroducing,
    WordLearningAttributesRepitition
} from './Word/WordLearningAttributes';

function shuffleArray(array: any[], elementsCount: number = array.length): any[] {
    if (elementsCount < 0) {
        elementsCount = array.length;
    }
    const newArray = array.slice(0, elementsCount);
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

class LearningSession {
    private currentWord: Word;
    private sessionFinishedHandler: Function = () => { };
    public words: Word[];
    public wordsToLearn: Word[];
    constructor(
        words: Word[],
        private mode: WordRepitionMode,
        wordsPerSession: number = 10,
        public correctAnswersForWordPerSession: number = 2,
        public incorrectAnswersForWordPerSession: number = 3,
    ) {
        const filteredWords = words.filter(w => w.learningAttributes.wordRepitiotionMode === mode);
        filteredWords.forEach(w => w.sessionAttributes.clear());
        this.words = shuffleArray(filteredWords, wordsPerSession);
        this.wordsToLearn = this.words.slice();
        this.currentWord = words[0];
    }
    private removeWordFromLearnList(word: Word) {

    }
    private getNextIntroducingWord(answerWasCorrect: boolean): Word | null {
        const wordLearningAttributes = this.currentWord.learningAttributes as WordLearningAttributesIntroducing;
        const wordSessionAttributes = this.currentWord.sessionAttributes;
        if (answerWasCorrect) {
            wordLearningAttributes.incrementCorrectAnswersCount();
            wordSessionAttributes.currectAnswers++;
            if (wordLearningAttributes.isLearnt || wordSessionAttributes.currectAnswers == this.correctAnswersForWordPerSession) {
                this.removeWordFromLearnList(this.currentWord);
            }
            if (!this.wordsToLearn.length) {
                this.sessionFinishedHandler();
                return null;
            }
        } else {
            wordSessionAttributes.incorrectAnswers++;
            if (wordSessionAttributes.incorrectAnswers < this.incorrectAnswersForWordPerSession) {
                this.wordsToLearn.splice(1, 0, this.currentWord);
            }
        }
        return this.wordsToLearn.shift() || null;
    }
    private getNextRepeatingWord(answerWasCorrect: boolean): Word | null {
        const wordLearningAttributes = this.currentWord.learningAttributes as WordLearningAttributesRepitition;
        const wordSessionAttributes = this.currentWord.sessionAttributes;
        if (answerWasCorrect) {
            wordLearningAttributes.upgradeRepititionStage();
            wordSessionAttributes.currectAnswers++;
            if (wordSessionAttributes.currectAnswers == this.correctAnswersForWordPerSession) {
                this.removeWordFromLearnList(this.currentWord);
            }
            if (!this.wordsToLearn.length) {
                this.sessionFinishedHandler();
                return null;
            }
        } else {
            wordSessionAttributes.incorrectAnswers++;
            if (wordSessionAttributes.incorrectAnswers < this.incorrectAnswersForWordPerSession) {
                this.wordsToLearn.splice(1, 0, this.currentWord);
            }
        }
        return this.wordsToLearn.shift() || null;
    }
    getNextWord(answerWasCorrect: boolean): Word | null {
        if (this.mode === WordRepitionMode.Introducing) {
            return this.getNextIntroducingWord(answerWasCorrect);
        } else {
            return this.getNextRepeatingWord(answerWasCorrect);
        }
    }
    onSessionFinished(cb: Function) {
        this.sessionFinishedHandler = cb;
    }
}

function checkWordByEbbinghaus(word: Word) {

}