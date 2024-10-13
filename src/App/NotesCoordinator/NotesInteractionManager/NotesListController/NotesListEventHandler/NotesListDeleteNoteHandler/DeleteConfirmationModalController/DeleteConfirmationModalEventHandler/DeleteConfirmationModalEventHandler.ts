import ConfirmListenerManager
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListEventHandler/NotesListDeleteNoteHandler/DeleteConfirmationModalController/DeleteConfirmationModalEventHandler/ConfirmListenerManager/ConfirmListenerManager';
import NsDeleteConfirmationModal
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListEventHandler/NotesListDeleteNoteHandler/DeleteConfirmationModalController/namespace';

class DeleteConfirmationModalEventHandler {
    private _confirmListenerManager: ConfirmListenerManager = new ConfirmListenerManager()
    private _closeModalFnc: ( () => void ) | null = null;


    constructor() {

    }

    private closeModal() {
        if ( this._closeModalFnc === null ) {
            throw new Error( 'Close modal function not specified' )
        }

        this._closeModalFnc()
    }

    public clickHandler( event: Event ) {
        const target = event.target;
        if ( !( target instanceof Element ) ) {
            return;
        }

        if ( this.tryHandleCancelTriggerTarget( target ) ) {
            return;
        }

        if ( this.tryHandleConfirmTriggerTarget( target ) ) {
            return;
        }
    }

    private tryHandleCancelTriggerTarget( target: Element ): boolean {
        const cancelTriggerElement = target.closest( `.${ NsDeleteConfirmationModal.kCancelTriggerElementClass }` )
        if ( !( cancelTriggerElement instanceof Element ) ) {
            return false;
        }

        this.closeModal()

        return true;
    }

    private tryHandleConfirmTriggerTarget( target: Element ): boolean {
        const cancelTriggerElement = target.closest( `.${ NsDeleteConfirmationModal.kConfirmTriggerElementClass }` )
        if ( !( cancelTriggerElement instanceof Element ) ) {
            return false;
        }

        this._confirmListenerManager.triggerConfirmListeners()
        this.closeModal()

        return true;
    }


    public static Builder = class {
        private _eventHandlerInstance: DeleteConfirmationModalEventHandler = new DeleteConfirmationModalEventHandler();

        constructor() {

        }

        public addConfirmListener( ...listener: Parameters<ConfirmListenerManager['addConfirmListener']> ): this {
            this._eventHandlerInstance._confirmListenerManager.addConfirmListener( ...listener );

            return this;
        }

        public setModalCloseTriggerFnc( closeModalFnc: () => void ): this {
            this._eventHandlerInstance._closeModalFnc = closeModalFnc;

            return this;
        }

        public build(): DeleteConfirmationModalEventHandler {
            return this._eventHandlerInstance
        }
    }
}

export default DeleteConfirmationModalEventHandler