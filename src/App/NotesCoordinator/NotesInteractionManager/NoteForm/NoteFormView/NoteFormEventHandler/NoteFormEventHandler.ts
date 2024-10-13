import NoteSubmitProcessor
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NoteForm/NoteFormView/NoteFormEventHandler/NoteSubmitProcessor/NoteSubmitProcessor';
import CloseButtonHandler
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NoteForm/NoteFormView/NoteFormEventHandler/CloseButtonHandler/CloseButtonHandler';
import NoteSubmitListenersManager
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NoteForm/NoteFormView/NoteFormEventHandler/NoteSubmitListenersManager/NoteSubmitListenersManager';
import NoteFormView from '@Src/App/NotesCoordinator/NotesInteractionManager/NoteForm/NoteFormView/NoteFormView';


class NoteFormEventHandler {
    private readonly _noteSubmitProcessor: NoteSubmitProcessor = new NoteSubmitProcessor();
    private readonly _closeButtonHandler: CloseButtonHandler = new CloseButtonHandler();
    private readonly _noteSubmitListenersManager: NoteSubmitListenersManager = new NoteSubmitListenersManager();

    constructor(
        private readonly _view: NoteFormView
    ) {
        this.initListeners()
    }

    private initListeners() {
        this._view.addEventListener( 'click', this.formClickHandler.bind( this ) );
        this._view.addEventListener( 'submit', this.formSubmitHandler.bind( this ) );
    }

    private formClickHandler( event: Event ) {
        if ( !this._closeButtonHandler.isCloseButtonClicked( event ) ) {
            return;
        }

        this._view.close()
    }

    private formSubmitHandler( event: Event ) {
        event.preventDefault();

        const newNote = this._noteSubmitProcessor.processSubmit( event );
        if ( !newNote ) {
            return
        }

        this._noteSubmitListenersManager.triggerNewNoteListeners( newNote );
        this._view.close();
    }

    public addNoteSubmitListener( ...args: Parameters<NoteSubmitListenersManager['addListener']> ): void {
        this._noteSubmitListenersManager.addListener( ...args );
    }
}

export default NoteFormEventHandler;