import { Word, WordType } from '../word/word';
import { Excercise } from './excercise';
import { SessionResponse } from './sessionResponse';
import { WordSessionAttributes } from '../word/wordSessionAttributes';
import { Queue } from './queue';
import { getRandomNumberFromInterval, getProgress } from '../../helpers';
/**
 * @description Class for learning session. It works with words and generates new excercises.
 */
export class Session {
    private _words: Word[];
    public get words(): Word[] {
        return [...this._words];
    }
    private _wordsLearningQueue: Queue<Word>;
    public get wordsLearningQueue(): Queue<Word> {
        return this._wordsLearningQueue.getCopy();
    }
    private _currentExcercise!: Excercise | null;
    public get currentExcercise(): Excercise | null {
        return this._currentExcercise
            ? { ...this._currentExcercise } as Excercise // TODO: should make deep copy
            : null;
    }
    constructor(words: Word[], wordType: WordType = WordType.Intro) {
        // TODO: For wordType = repeating it should filter with repeating exp date
        this._words = words.filter(w => w.type === wordType);
        this._words.forEach(w => w.sessionAttributes = new WordSessionAttributes());
        this._wordsLearningQueue = new Queue(this._words);
    }

    /**
     * @description Method for generation a new excercise in the current learning session.
     * @param {Word} word The object of word for which needs to generate new Excercise object.
     * @returns {Excercise} New excercise object.
     */
    public generateExcercise(word: Word): Excercise {
        const answerWords = [];
        for (let i = 0; i < this._words.length; i++) {
            const currentWord = this._words[i];
            if (currentWord.id === word.id) {
                continue;
            }
            answerWords.push(currentWord);
            if (answerWords.length >= 4) {
                break;
            }
        }
        // TODO: generate different excercise types
        return new Excercise(word, answerWords);
    }

    /**
     * @description Starts new learning session.
     * @returns {SessionResponse} reaction of the session on intercation.
     */
    public start(): SessionResponse {
        const firstWord = this._wordsLearningQueue.pop();
        if (!firstWord) {
            throw Error('There is no words to start new session!');
        }
        const newExcercise = this.generateExcercise(firstWord);
        this._currentExcercise = newExcercise;
        return new SessionResponse(0, false, newExcercise);
    }

    /**
     * @description Method for answering current excercise.
     * @param {Word|string} answer Answer of the current excercise.
     * @returns {SessionResponse} reaction of the session on intercation.
     */
    public answer(answer: Word | string): SessionResponse {
        if (this._currentExcercise == null) {
            return this.start();
        }

        const questionWord = this._words.find(w => w.id === this._currentExcercise?.question.id);
        if (!questionWord) {
            throw Error('Fatal error during answer() in session. Reason: !questionWord');
        }
        // For ts lynting. Ts shows error althought sessionAttributes initialised in ctor.
        if (!questionWord.sessionAttributes) {
            // TODO: check current progress and if it's more than 0 do something
            questionWord.sessionAttributes = new WordSessionAttributes();
        }

        const isCorrect = this._currentExcercise.question.checkAnswer(answer);
        if (isCorrect) {
            questionWord.sessionAttributes.currectAnswers += 1;
            if (questionWord.sessionAttributes.currectAnswers < 2) {
                this._wordsLearningQueue.push(questionWord, getRandomNumberFromInterval(1, this._wordsLearningQueue.length));
            }
            else {
                questionWord.incrementCorrectCounter();
            }
        } else {
            questionWord.sessionAttributes.incorrectAnswers += 1;
            if (questionWord.sessionAttributes.incorrectAnswers < 3) {
                this._wordsLearningQueue.push(questionWord);
            }
        }
        const nextWord = this._wordsLearningQueue.pop();
        if (!nextWord) {
            this.finish();
            return new SessionResponse(100, isCorrect);
        }
        const newExcercise = this.generateExcercise(nextWord);
        this._currentExcercise = newExcercise;
        return new SessionResponse(getProgress(this._wordsLearningQueue.length, this._words.length), isCorrect, newExcercise);
    }
    public finish(): void { }
}