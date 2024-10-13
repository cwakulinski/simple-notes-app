import Note from '@Src/App/NotesCoordinator/NoteService/Note';

type NoteSubmitListener = ( createdNote: Note ) => void;

class NoteSubmitListenersManager {
    private _newNoteListeners: NoteSubmitListener[] = []

    constructor() {

    }

    public addListener(listener: NoteSubmitListener): void {
        this._newNoteListeners.push(listener);
    }

    public triggerNewNoteListeners(note: Note): void {
        for (const listener of this._newNoteListeners) {
            listener(note);
        }
    }
}

export default NoteSubmitListenersManager