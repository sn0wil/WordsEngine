import { RepititionStage, WordRepitionMode } from '../enums';

export interface IWordLearningAttributes {
    wordRepitiotionMode: WordRepitionMode;
}

export class WordLearningAttributesIntroducing implements IWordLearningAttributes {
    private neededCorrectAnswersCount: number = 6;
    public correctAnswersCount: number = 0;
    public wordRepitiotionMode = WordRepitionMode.Introducing;
    get isLearnt(): boolean {
        return this.correctAnswersCount == this.neededCorrectAnswersCount;
    }
    constructor(neededCorrectAnswersCount: number = 6) {
        this.neededCorrectAnswersCount = neededCorrectAnswersCount;
    }
    incrementCorrectAnswersCount() {
        if (!this.isLearnt) {
            this.correctAnswersCount++;
        }
    }
}

export class WordLearningAttributesRepitition implements IWordLearningAttributes {
    public wordRepitiotionMode = WordRepitionMode.Repeating;
    public currentRepitionStage: RepititionStage = RepititionStage.First;
    upgradeRepititionStage() {
        if (RepititionStage.Fifth !== this.currentRepitionStage) {
            ++this.currentRepitionStage;
        }
    }
    downradeRepititionStage() {
        if (RepititionStage.First !== this.currentRepitionStage) {
            --this.currentRepitionStage;
        }
    }
}