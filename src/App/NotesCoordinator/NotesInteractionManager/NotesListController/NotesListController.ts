import Note from '@Src/App/NotesCoordinator/NoteService/Note';
import NotesListEventHandler
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListEventHandler/NotesListEventHandler';
import NotesListRenderer
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListRenderer/NotesListRenderer';


class NotesListController {
    private readonly _notesListRenderer: NotesListRenderer = new NotesListRenderer()
    private readonly _eventHandler: NotesListEventHandler = this.buildNotesListEventHandler()

    private _displayNotesData: Note[] = []

    constructor() {
        this.initListeners()
    }

    private initListeners() {
        this._notesListRenderer.addEventListener( 'click', this._eventHandler.clickEventHandler.bind( this._eventHandler ) )
    }


    public onNoteDelete( ...args: Parameters<NotesListEventHandler['addNoteDeleteListener']> ) {
        this._eventHandler.addNoteDeleteListener( ...args )
    }

    public onNoteEdit( ...args: Parameters<NotesListEventHandler['addNoteEditListener']> ) {
        this._eventHandler.addNoteEditListener( ...args )
    }

    public setNewNotes( notes: Note[] ) {
        this._displayNotesData = notes;

        this._notesListRenderer.renderNotes( this._displayNotesData );
    }

    private buildNotesListEventHandler(): NotesListEventHandler {
        const output = new NotesListEventHandler.Builder()
            .setGetNoteByIdFnc( this.getNoteById.bind( this ) )
            .build()

        return output
    }

    private getNoteById( id: number ): Note | undefined {
        return this._displayNotesData.find( ( note ) => note.id === id )
    }
}


export default NotesListController;