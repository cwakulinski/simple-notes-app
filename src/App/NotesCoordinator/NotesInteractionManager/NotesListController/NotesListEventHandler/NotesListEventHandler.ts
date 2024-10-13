import NsNotesListController from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/namespace';
import Note from '@Src/App/NotesCoordinator/NoteService/Note';


import NoteListItemBuilder
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListRenderer/NoteListItemBuilder/NoteListItemBuilder';
import NotesListDeleteNoteHandler
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListEventHandler/NotesListDeleteNoteHandler/NotesListDeleteNoteHandler';
import NotesListEditNoteHandler
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListEventHandler/NotesListEditNoteHandler/NotesListEditNoteHandler';


class NotesListEventHandler {
    private readonly _notesListDeleteHandler: NotesListDeleteNoteHandler = new NotesListDeleteNoteHandler()
    private readonly _notesListEditNoteHandler: NotesListEditNoteHandler = new NotesListEditNoteHandler()


    private _getNoteById: ( ( id: number ) => Note | undefined ) | null = null;

    constructor() {

    }

    private get getNoteById(): Exclude<NotesListEventHandler['_getNoteById'], null> {
        if ( this._getNoteById === null ) {
            throw new Error( 'Get note by id method not specified' )
        }

        return this._getNoteById;
    }

    public addNoteDeleteListener( ...params: Parameters<NotesListDeleteNoteHandler['addNoteDeleteListener']> ) {
        this._notesListDeleteHandler.addNoteDeleteListener( ...params )
    }

    public addNoteEditListener( ...params: Parameters<NotesListEditNoteHandler['addNoteEditListener']> ) {
        this._notesListEditNoteHandler.addNoteEditListener( ...params )
    }

    public clickEventHandler( event: Event ) {
        const target = event.target
        if ( !( target instanceof Element ) ) {
            return;
        }

        if ( this.tryHandleEditTriggerClickTarget( target ) ) {
            return;
        }

        if ( this.tryHandleDeleteTriggerClickTarget( target ) ) {
            return;
        }
    }

    private tryHandleEditTriggerClickTarget( target: Element ): boolean {
        const editTrigger = target.closest( `.${ NsNotesListController.kEditNoteTriggerClass }` );
        if ( !( editTrigger instanceof Element ) ) {
            return false
        }


        const targetNote = this.getNoteFromNestedListItemElement( target )
        this._notesListEditNoteHandler.handleEditNote( targetNote );

        return true
    }

    private tryHandleDeleteTriggerClickTarget( target: Element ): boolean {
        const deleteTrigger = target.closest( `.${ NsNotesListController.kDeleteNoteTriggerClass }` );
        if ( !( deleteTrigger instanceof Element ) ) {
            return false
        }

        const targetNote = this.getNoteFromNestedListItemElement( target )
        this._notesListDeleteHandler.handleDeleteNote( targetNote );
        return true
    }


    private getNoteFromNestedListItemElement( target: Element ): Note {
        const noteId = this.getNoteIdFromNestedListItemElement( target )

        const targetNote = this.getNoteById( noteId );

        if ( !targetNote ) {
            throw new Error( 'Targeted note does not exist' )
        }

        return targetNote
    }

    private getNoteIdFromNestedListItemElement( target: Element ): number {
        const listItemElement = target.closest( `.${ NsNotesListController.kListItemClass }` )

        if ( !( listItemElement instanceof Element ) ) {
            throw new Error( 'Target is not nested inside list element' )
        }

        return NoteListItemBuilder.getNoteIdByBuiltElement( listItemElement );
    }

    public static Builder = class {
        private readonly _outputInstance = new NotesListEventHandler()

        constructor() {

        }

        public setGetNoteByIdFnc( fnc: Exclude<NotesListEventHandler['_getNoteById'], null> ): this {
            this._outputInstance._getNoteById = fnc

            return this;
        }

        public build() {
            return this._outputInstance;
        }
    }


}


export default NotesListEventHandler;