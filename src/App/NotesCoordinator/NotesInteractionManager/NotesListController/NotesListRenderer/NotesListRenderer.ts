import FrontUtil from '@Util/FrontUtil';
import NsNotesListController from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/namespace';
import Note from '@Src/App/NotesCoordinator/NoteService/Note';
import NoteListItemBuilder
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListRenderer/NoteListItemBuilder/NoteListItemBuilder';

class NotesListRenderer {
    private readonly _notesListElement = this.getNotesListElement()

    constructor() {

    }

    private getNotesListElement() {
        const output = FrontUtil.getAppElement( `.${ NsNotesListController.kContainerElementClass }` )

        if ( !( output instanceof HTMLElement ) ) {
            throw new Error( 'Unable to extract notes list element' )
        }

        return output
    }

    public addEventListener( ...args: Parameters<HTMLElement['addEventListener']> ) {
        this._notesListElement.addEventListener( ...args );
    }
    public renderNotes( notes: Note[] ) {
        this.clearAllNotesElements()
        this.renderNotesData(notes)
    }

    private clearAllNotesElements() {
        while ( this._notesListElement.firstChild ) {
            this._notesListElement.firstChild.remove()
        }
    }

    private renderNotesData( notes: Note[]) {
        for ( const noteToRender of notes ) {
            this.renderNote( noteToRender )
        }
    }

    private renderNote( noteToRender: Note ) {
        const noteNode = new NoteListItemBuilder()
            .setNoteData( noteToRender )
            .build()

        noteNode.classList.add( NsNotesListController.kListItemClass )

        this._notesListElement.appendChild( noteNode )
    }
}

export default NotesListRenderer;