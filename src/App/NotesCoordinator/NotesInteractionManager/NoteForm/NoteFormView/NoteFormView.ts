import FrontUtil from '@Util/FrontUtil';

import NoteFormEventHandler
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NoteForm/NoteFormView/NoteFormEventHandler/NoteFormEventHandler';
import NsNoteForm from '@Src/App/NotesCoordinator/NotesInteractionManager/NoteForm/namespace';
import Note from '@Src/App/NotesCoordinator/NoteService/Note';

class NoteFormView {
    private _noteFormElement: Element = FrontUtil.parseHTMLStringIntoNode( require( '@Static/template/NoteForm/index.pug' ).default );
    private _eventHandler: NoteFormEventHandler = new NoteFormEventHandler( this )

    constructor() {
        this.injectFormElementIntoApp();
    }

    public addNoteSubmitListener( ...listener: Parameters<NoteFormEventHandler['addNoteSubmitListener']> ): this {
        this._eventHandler.addNoteSubmitListener( ...listener );

        return this;
    }

    private injectFormElementIntoApp() {
        const injectTarget = FrontUtil.getAppElement( `.${ NsNoteForm.kTargetInjectElementClass }` )

        if ( !injectTarget ) {
            throw new Error( 'Missing inject target element' )
        }

        injectTarget.appendChild( this._noteFormElement );
    }

    public close() {
        this._noteFormElement.remove()
    }

    public isOpen(): boolean {
        return FrontUtil.appRoot.contains( this._noteFormElement );
    }

    public addEventListener( ...args: Parameters<HTMLElement['addEventListener']> ) {
        this._noteFormElement.addEventListener( ...args );
    }

    public setTitle( title: string ): void {
        const titleElement = this._noteFormElement.querySelector( `.${ NsNoteForm.kFormHeaderTitleClass }` )
        if ( !titleElement ) {
            return;
        }

        titleElement.textContent = title
    }

    public setDefaultNoteData( note: Note ): void {
        this.setNoteTitleInputText( note )
        this.setNoteContentInputText( note )
    }

    private setNoteTitleInputText( note: Note ) {
        const noteTitleInput = this._noteFormElement.querySelector( `.${ NsNoteForm.kNoteTitleInputClass }` )
        if ( noteTitleInput instanceof HTMLInputElement ) {
            noteTitleInput.value = note.title
        }
    }

    private setNoteContentInputText( note: Note ) {
        const noteContentTextarea = this._noteFormElement.querySelector( `.${ NsNoteForm.kNoteContentInputClass }` )
        if ( noteContentTextarea instanceof HTMLTextAreaElement ) {
            noteContentTextarea.value = note.content
        }
    }


}

export default NoteFormView