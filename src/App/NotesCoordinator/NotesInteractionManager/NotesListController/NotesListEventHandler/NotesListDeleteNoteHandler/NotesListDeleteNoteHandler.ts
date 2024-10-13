import Note from '@Src/App/NotesCoordinator/NoteService/Note';
import DeleteConfirmationModalController
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListEventHandler/NotesListDeleteNoteHandler/DeleteConfirmationModalController/DeleteConfirmationModalController';

type NoteDeleteListener = ( note: Note ) => void;

class NotesListDeleteNoteHandler {
    private readonly _deleteNoteListeners: NoteDeleteListener[] = []

    constructor() {

    }

    public handleDeleteNote( targetNote: Note ) {
        new DeleteConfirmationModalController.Builder()
            .addConfirmListener( this.triggerNoteDeleteListeners.bind( this, targetNote ) )
            .build()
    }

    public addNoteDeleteListener( listener: NoteDeleteListener ) {
        this._deleteNoteListeners.push( listener )
    }

    private triggerNoteDeleteListeners( noteToDelete: Note ) {
        for ( const listener of this._deleteNoteListeners ) {
            listener( noteToDelete )
        }
    }
}

export default NotesListDeleteNoteHandler