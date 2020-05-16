import words from './words.json';
import { Session } from './entities/session/session.js';
import { getTestWords } from './helpers.js';
import { SessionResponse } from './entities/session/sessionResponse.js';

enum SessionInteraction {
    Answer,
    Finish
}

export class WordsEngine {
    private static _sessions: Session[] = [];
    public static getPotentialSession(uid: string): Session {
        return this._sessions[0];
    }

    public static initateSession(): Session {
        const newSession = new Session(getTestWords());
        this._sessions.push(newSession);
        return newSession;
    }

    public static sessionInteract(sessionUid: string, type: SessionInteraction, data: any) {
        const session = this.getPotentialSession(sessionUid);

        switch (type) {
            case SessionInteraction.Answer:
                return session.answer(data);
            case SessionInteraction.Finish:
                return session.finish();
            default:
                break;
        }
    }
}