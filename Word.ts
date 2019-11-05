export enum WordRepitionMode {
    Introducing = 0,
    Repeating = 1
}

class WordAttributes {
    public guid: string;
    public text: string;
    public translation: string;
    public description: string;
    public transcription: string;
    public examples: string[];
}

interface IWordLearningAttributes {
    wordRepitiotionMode: WordRepitionMode;
}

export class WordLearningAttributesIntroducing implements IWordLearningAttributes {
    public correctAnswersCount: number = 0;
    public wordRepitiotionMode = WordRepitionMode.Introducing;
    private neededCorrectAnswersCount: number = 6;
    isLearnt() {
        return this.correctAnswersCount === this.neededCorrectAnswersCount;
    }
    incrementCorrectAnswersCount() {
        if (!this.isLearnt) {
            this.correctAnswersCount++;
        }
    }
}

// How often the word should be repeated
// 0 - in 5 sec
// 1 - in 25 sec
// 2 - in 8 hours
// 3 - in 1 week
// 4 - in 2 weeks
enum RepititionStage {
    First = 0,
    Second = 1,
    Third = 2,
    Fourth = 3,
    Fifth = 4
} // TODO: exparitor

export class WordLearningAttributesRepitition implements IWordLearningAttributes {
    public wordRepitiotionMode = WordRepitionMode.Repeating;
    public currentRepitionStage: RepititionStage = RepititionStage.First;
    upgradeRepititionStage() {
        if (RepititionStage.Fifth !== this.currentRepitionStage) {
            ++this.currentRepitionStage;
        }
    }
    downradeRepititionStage() {
        if (RepititionStage.Second !== this.currentRepitionStage) {
            --this.currentRepitionStage;
        }
    }
}

export class WordSessionAttributes {
    public currectAnswers: number = 0;
    public incorrectAnswers: number = 0;
    clear() {
        this.currectAnswers = this.incorrectAnswers = 0;
    }
}

export class Word {
    public generalAttributes: WordAttributes;
    public learningAttributes: (WordLearningAttributesRepitition | WordLearningAttributesIntroducing);
    public sessionAttributes: WordSessionAttributes;
    checkWordAnswer(answer: (Word | string) = null): boolean {
        if (typeof answer === 'string') {
            return this.generalAttributes.translation === answer;
        }
        else if (answer instanceof Word) {
            return this.generalAttributes.translation === (answer as Word).generalAttributes.translation
        }
        return false;
    }
}