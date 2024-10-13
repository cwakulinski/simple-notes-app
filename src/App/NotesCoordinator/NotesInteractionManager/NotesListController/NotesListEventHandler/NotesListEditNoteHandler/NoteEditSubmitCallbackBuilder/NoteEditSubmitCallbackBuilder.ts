import Note from '@Src/App/NotesCoordinator/NoteService/Note';
import NoteForm from '@Src/App/NotesCoordinator/NotesInteractionManager/NoteForm/NoteForm';

class NoteEditSubmitCallbackBuilder {
    private _baseNote: Note | null = null;
    private _editReadyCallback: ( ( note: Note ) => void ) | null = null;

    constructor() {

    }

    private get baseNote(): Note {
        if ( this._baseNote === null ) {
            throw new Error( 'Base note not set' );
        }

        return this._baseNote;
    }

    private get editReadyCallback(): Exclude<NoteEditSubmitCallbackBuilder['_editReadyCallback'], null> {
        if ( this._editReadyCallback === null ) {
            throw new Error( 'Edit ready callback not set' );
        }

        return this._editReadyCallback;
    }

    public setBaseNote( note: Note ): this {
        this._baseNote = note;

        return this;
    }

    public setEditReadyCallback( callback: Exclude<NoteEditSubmitCallbackBuilder['_editReadyCallback'], null> ): this {
        this._editReadyCallback = callback;

        return this;
    }

    private outputBindMethod( submittedNote: Note ) {
        const editedNote = new Note.Builder()
            .edit( this.baseNote )
            .setTitle( submittedNote.title )
            .setContent( submittedNote.content )
            .build();

        this.editReadyCallback( editedNote )
    }

    public build(): Parameters<typeof NoteForm.Builder.prototype.addNoteSubmitListener> {
        return [ this.outputBindMethod.bind( this ) ];
    }


}

export default NoteEditSubmitCallbackBuilder