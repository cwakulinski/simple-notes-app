

import SearchBarController from '@Src/App/NotesCoordinator/SearchBar/SearchBar';
import NotesPipeline from '@Src/App/NotesCoordinator/NotesPipeline/NotesPipeline';
import NotesInteractionManager from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesInteractionManager';
import NotesService from '@Src/App/NotesCoordinator/NoteService/NotesService';
import Note from '@Src/App/NotesCoordinator/NoteService/Note';
import NotesViewController
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesViewController/NotesViewController';


class NotesCoordinator {
    private readonly _notesService = new NotesService();

    private readonly _searchBarController = new SearchBarController();

    private readonly _interactionManager = new NotesInteractionManager();

    private readonly _notesViewController = new NotesViewController();

    constructor() {
        this.initListeners();
        this.updateDisplayedNotes()
    }


    private initListeners() {
        this._searchBarController.onSearchQuerySubmit( this.updateDisplayedNotes.bind( this ) );

        this._interactionManager.onNewNote( this.addNewNote.bind( this ) );
        this._interactionManager.onNoteDelete( this.deleteNote.bind( this ) );
        this._interactionManager.onNoteEdit( this.addEditedNote.bind( this ) );
    }

    private addNewNote( newNote: Note ): void {
        this._notesService.addNewNote( newNote );
        this.updateDisplayedNotes()
    }

    private deleteNote( targetNote: Note ): void {
        this._notesService.deleteNote( targetNote );
        this.updateDisplayedNotes()
    }

    private addEditedNote( editedNote: Note ): void {
        this._notesService.addEditedNote( editedNote );
        this.updateDisplayedNotes()
    }

    private updateDisplayedNotes() {
        this.setAppropriateNotesView();
        this.updateNotesList()
    }

    private updateNotesList() {
        const processedNotes = new NotesPipeline()
            .setCollection( this._notesService.notes )
            .filterByString( this._searchBarController.getSearchQuery() )
            .getOutput()

        this._interactionManager.setDisplayNotes( processedNotes );
    }

    public setAppropriateNotesView() {
        if ( this._notesService.notes.length ) {
            this._notesViewController.showStdNotesView()
        } else {
            this._notesViewController.showNoNotesView()
        }
    }
}

export default NotesCoordinator;