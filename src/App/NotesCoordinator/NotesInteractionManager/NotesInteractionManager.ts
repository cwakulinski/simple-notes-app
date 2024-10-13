import NewNoteCreatorController
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NewNoteCreatorController/NewNoteCreatorController';
import NotesListController from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListController';

import Note from '@Src/App/NotesCoordinator/NoteService/Note';

class NotesInteractionManager {
    private readonly _newNoteCreatorController = new NewNoteCreatorController();
    private readonly _notesListController = new NotesListController();



    constructor() {

    }

    public setDisplayNotes( notes: Note[] ): void {
        this._notesListController.setNewNotes( notes );
    }



    public onNewNote( ...args: Parameters<NewNoteCreatorController['onNewNote']> ): void {
        this._newNoteCreatorController.onNewNote( ...args );
    }

    public onNoteDelete( ...args: Parameters<NotesListController['onNoteDelete']> ) {
        this._notesListController.onNoteDelete( ...args );
    }

    public onNoteEdit( ...args: Parameters<NotesListController['onNoteEdit']> ) {
        this._notesListController.onNoteEdit( ...args );
    }
}

export default NotesInteractionManager;