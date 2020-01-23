// How often the word should be repeated
// 0 - in 5 sec
// 1 - in 25 sec
// 2 - in 8 hours
// 3 - in 1 week
// 4 - in 2 weeks
export enum RepititionStage {
    First = 0,
    Second = 1,
    Third = 2,
    Fourth = 3,
    Fifth = 4
} // TODO: exparitor

export enum WordRepitionMode {
    Introducing = 0,
    Repeating = 1
}