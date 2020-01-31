import { getTestWords } from '../helpers';
import { Session } from './Session';
import { WordSessionAttributes } from '../Word/WordSessionAttributes';
import { WordType, Word } from '../Word/Word';
import { Excercise } from './Excercise';

const words = getTestWords();

it('ctor initialises all needed fields', () => {
    const session = new Session(words);
    expect(session.words.length).toEqual(words.length);
    expect(session.words[0].sessionAttributes).toBeInstanceOf(WordSessionAttributes);
    expect(session.wordsLearningQueue.length).toEqual(words.length);
});

it('session adds only needed word types', () => {
    const session = new Session(words, WordType.Repeating);
    expect(session.words.length).toEqual(words.filter(w => w.type === WordType.Repeating).length);
});

it('start returns correct sessionResponse', () => {
    const session = new Session(words);
    const sessionResponse = session.start();
    // expect(session.currentExcercise).toBeInstanceOf(Excercise); // TODO: think about deep copy or delete
    expect(sessionResponse.sessionProgress).toEqual(0);
    expect(sessionResponse.wasPrevAnswerCorrect).toBeFalsy();
});

it('generate new excercise generates correct Excercise', () => {
    const session = new Session(words);
    const excercise = session.generateExcercise(words[0]);
    expect(excercise).not.toBeUndefined();
    // expect(excercise).toBeInstanceOf(Excercise);
    expect(excercise.question).not.toBeUndefined();
    expect(excercise.question).toBeInstanceOf(Word);
    expect(excercise.question.id).toEqual(words[0].id);
    expect(excercise.answers.length).not.toEqual(0);
    expect(excercise.answers.length).not.toEqual(words.length);
});

it('answer should send correct session response in case of correct answer', () => {
    const session = new Session(words);
    const sessionResponse = session.start();
    const { excercise } = sessionResponse;
    if (!excercise) {
        return; // TODO: improve
    }
    const correctAnswer = (excercise.answers as Word[]).find(a => a.id === excercise.question.id);
    if (!correctAnswer) {
        return; // TODO: improve
    }
    const newSessionResponse = session.answer(correctAnswer);
    if (!newSessionResponse.excercise) {
        return; // TODO: improve
    }
    expect(newSessionResponse.wasPrevAnswerCorrect).toBeTruthy();
    expect(newSessionResponse.sessionProgress).not.toEqual(0);
    expect(newSessionResponse.excercise.question.id).not.toEqual(excercise.question.id);
});

// TODO: add more cases for session reaction