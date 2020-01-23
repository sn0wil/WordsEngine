import {
    WordLearningAttributesIntroducing,
    WordLearningAttributesRepitition
} from '../../src_old/Word/WordLearningAttributes';
import { RepititionStage } from '../../src_old/enums';

describe('WordLearningAttributesIntroducing', () => {
    test('incrementCorrectAnswersCount should increase correctAnswersCount by 1', () => {
        const learningAttributes = new WordLearningAttributesIntroducing();
        learningAttributes.incrementCorrectAnswersCount();
        expect(learningAttributes.correctAnswersCount).toEqual(1);
    });
    test('incrementCorrectAnswersCount should NOT increase correctAnswersCount by 1 if the word is learnt', () => {
        const learningAttributes = new WordLearningAttributesIntroducing(0);
        learningAttributes.incrementCorrectAnswersCount();
        expect(learningAttributes.correctAnswersCount).toEqual(0);
    });
    test('isLearnt shoud return TRUE if increment was called neededCorrectAnswersCount times', () => {
        const neededCorrectAnswersCount = 6;
        const learningAttributes = new WordLearningAttributesIntroducing(neededCorrectAnswersCount);
        for (let index = 0; index < neededCorrectAnswersCount; index++) {
            learningAttributes.incrementCorrectAnswersCount();
        }
        expect(learningAttributes.isLearnt).toEqual(true);
    });
    test('isLearnt shoud return FALSE if increment was called NOT neededCorrectAnswersCount times', () => {
        const neededCorrectAnswersCount = 6;
        const learningAttributes = new WordLearningAttributesIntroducing(neededCorrectAnswersCount);
        for (let index = 0; index < neededCorrectAnswersCount - 1; index++) {
            learningAttributes.incrementCorrectAnswersCount();
        }
        expect(learningAttributes.isLearnt).toEqual(false);
    });
});
describe('WordLearningAttributesRepitition', () => {
    test('upgradeRepititionStage should increment currentRepitionStage', () => {
        const learningAttributes = new WordLearningAttributesRepitition();
        learningAttributes.upgradeRepititionStage();
        expect(learningAttributes.currentRepitionStage).toEqual(1)
    });
    test('upgradeRepititionStage should NOT increment currentRepitionStage on LAST stage', () => {
        const learningAttributes = new WordLearningAttributesRepitition();
        const repetitionStagesCount = Object.keys(RepititionStage).length / 2;
        for (let i = 0; i < repetitionStagesCount; i++) {
            learningAttributes.upgradeRepititionStage();
        }
        expect(learningAttributes.currentRepitionStage).toEqual(repetitionStagesCount - 1)
    });
    test('downgradeRepititionStage should decrement currentRepitionStage', () => {
        const learningAttributes = new WordLearningAttributesRepitition();
        learningAttributes.upgradeRepititionStage();
        learningAttributes.downradeRepititionStage();
        expect(learningAttributes.currentRepitionStage).toEqual(0)
    });
    test('downgradeRepititionStage should NOT decrement currentRepitionStage on FIRST stage', () => {
        const learningAttributes = new WordLearningAttributesRepitition();
        learningAttributes.downradeRepititionStage();
        expect(learningAttributes.currentRepitionStage).toEqual(0)
    });
});