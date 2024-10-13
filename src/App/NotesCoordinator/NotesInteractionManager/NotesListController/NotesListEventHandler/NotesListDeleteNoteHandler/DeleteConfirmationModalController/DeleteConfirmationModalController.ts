import FrontUtil from '@Util/FrontUtil';
import DeleteConfirmationModalEventHandler
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListEventHandler/NotesListDeleteNoteHandler/DeleteConfirmationModalController/DeleteConfirmationModalEventHandler/DeleteConfirmationModalEventHandler';
import NsDeleteConfirmationModal
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListEventHandler/NotesListDeleteNoteHandler/DeleteConfirmationModalController/namespace';


class DeleteConfirmationModalController {
    private _eventHandlerHandle: DeleteConfirmationModalEventHandler | null = null;
    private _modalElement: Element = FrontUtil.parseHTMLStringIntoNode( require( '@Static/template/NoteDeleteConfirmModal/index.pug' ).default );


    constructor() {

    }

    private get eventHandler() {
        if ( this._eventHandlerHandle === null ) {
            throw new Error( 'Event handler not initialized' )
        }

        return this._eventHandlerHandle
    }


    private createModal() {
        this.initListeners();
        this.injectModalElementIntoDom()
    }

    private initListeners() {
        this._modalElement.addEventListener( 'click', this.eventHandler.clickHandler.bind( this._eventHandlerHandle ) );
    }

    private injectModalElementIntoDom() {
        const injectTarget = FrontUtil.getAppElement( `.${ NsDeleteConfirmationModal.kTargetInjectElementClass }` )
        if ( !injectTarget ) {
            throw new Error( 'Missing inject target element' )
        }

        injectTarget.appendChild( this._modalElement );
    }


    private close() {
        this._modalElement.remove()
    }

    public static Builder = class {
        private _instance: DeleteConfirmationModalController = new DeleteConfirmationModalController()
        private _eventHandlerBuilder = this.initDeleteConfirmationModalEventHandlerBuilder()

        constructor() {

        }

        private initDeleteConfirmationModalEventHandlerBuilder() {
            return new DeleteConfirmationModalEventHandler.Builder()
                .setModalCloseTriggerFnc( this._instance.close.bind( this._instance ) )
        }

        public addConfirmListener( ...listener: Parameters<typeof DeleteConfirmationModalEventHandler.Builder.prototype.addConfirmListener> ): this {
            this._eventHandlerBuilder.addConfirmListener( ...listener );

            return this;
        }

        private initInstanceEventHandler(): void {
            this._instance._eventHandlerHandle = this._eventHandlerBuilder.build()
        }

        public build() {
            this.initInstanceEventHandler()

            this._instance.createModal()
        }
    }
}

export default DeleteConfirmationModalController