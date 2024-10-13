import Note from '@Src/App/NotesCoordinator/NoteService/Note';
import NoteForm from '@Src/App/NotesCoordinator/NotesInteractionManager/NoteForm/NoteForm';
import NoteEditSubmitCallbackBuilder
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListEventHandler/NotesListEditNoteHandler/NoteEditSubmitCallbackBuilder/NoteEditSubmitCallbackBuilder';

type NoteEditListener = ( editedNote: Note ) => void;

class NotesListEditNoteHandler {
    private readonly _editNoteListeners: NoteEditListener[] = []
    private _noteFormInstance: NoteForm | null = null;

    constructor() {

    }

    public handleEditNote( targetNote: Note ) {
        if ( this.isEditFormAlreadyOpen() ) {
            return
        }

        this.openNewEditForm( targetNote )
    }

    private isEditFormAlreadyOpen() {
        return this._noteFormInstance !== null && this._noteFormInstance.isOpen()
    }

    private openNewEditForm( noteToEdit: Note ) {
        const editSubmitCallback = new NoteEditSubmitCallbackBuilder()
            .setBaseNote( noteToEdit )
            .setEditReadyCallback( this.triggerNoteEditListeners.bind( this ) )
            .build()

        this._noteFormInstance = new NoteForm.Builder()
            .setTitle( 'Edit note' )
            .setDefaultNoteData( noteToEdit )
            .addNoteSubmitListener( ...editSubmitCallback )
            .build()
    }

    public addNoteEditListener( listener: NoteEditListener ) {
        this._editNoteListeners.push( listener )
    }

    private triggerNoteEditListeners( editedNote: Note ) {
        for ( const listener of this._editNoteListeners ) {
            listener( editedNote )
        }
    }
}



export default NotesListEditNoteHandler