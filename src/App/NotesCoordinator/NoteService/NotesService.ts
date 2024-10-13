import Note from './Note';

class NotesService {
    private _notes: Note[] = []

    constructor() {

    }

    public get notes(): Note[] {
        return this._notes;
    }

    public addNewNote( note: Note ): void {
        if ( !this.isNoteValidForAddition( note ) ) {
            return
        }

        this._notes.push( note );
    }

    private isNoteValidForAddition( note: Note ): boolean {
        const isNoteAlreadyAggregated = this.getNoteById( note.id );
        if ( isNoteAlreadyAggregated ) {
            return false
        }

        return true;
    }

    public getNoteById( targetId: number ): Note | null {
        return this._notes.find( ( note ) => note.id === targetId ) ?? null;
    }


    public deleteNote( note: Note ) {
        const noteIndex = this.getNoteIndexById( note );
        if ( noteIndex === null ) {
            return
        }

        this._notes.splice( noteIndex, 1 );
    }

    private getNoteIndexById( targetNote: Note ): number | null {
        const noteIndex = this.notes.findIndex( ( note ) => note.id === targetNote.id );
        if ( noteIndex === -1 ) {
            return null;
        }

        return noteIndex;
    }

    private overrideNoteAtIndex( noteIndex: number, newNote: Note ): void {
        this._notes[ noteIndex ] = newNote;
    }

    public addEditedNote( editedNote: Note ): void {
        const noteIndex = this.getNoteIndexById( editedNote );
        if ( noteIndex === null ) {
            return
        }

        this.overrideNoteAtIndex( noteIndex, editedNote );
    }
}

export default NotesService;