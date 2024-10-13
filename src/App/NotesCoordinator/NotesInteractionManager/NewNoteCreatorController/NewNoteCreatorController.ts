

import NsNewNoteCreatorController from './namespace';
import FrontUtil from '@Util/FrontUtil';
import NoteForm from '@Src/App/NotesCoordinator/NotesInteractionManager/NoteForm/NoteForm';
import Note from '@Src/App/NotesCoordinator/NoteService/Note';



type NewNoteListener = ( note: Note ) => void;

class NewNoteCreatorController {
    private readonly _newNoteListeners: NewNoteListener[] = []
    private _noteFormInstance: NoteForm | null = null;

    constructor() {
        this.initListeners()
    }

    public onNewNote( listener: NewNoteListener ) {
        this._newNoteListeners
            .push( listener )
    }

    private initListeners() {
        FrontUtil.appRoot.addEventListener( 'click', this.triggerClickCallback.bind( this ) )
    }

    private triggerClickCallback( event: MouseEvent ) {
        if ( !this.isEventTargetingFormTriggerElement( event ) ) {
            return
        }

        this.openNewNoteForm()
    }

    private isEventTargetingFormTriggerElement( event: MouseEvent ) {
        const target = event.target

        if ( !( target instanceof Element ) ) {
            return false
        }

        const trigger = target.closest( `.${ NsNewNoteCreatorController.kFormCreateTriggerClass }` )
        if ( !( trigger instanceof Element ) ) {
            return false
        }

        return true;
    }

    private openNewNoteForm() {
        if ( this.isNoteFormAlreadyOpen() ) {
            return
        }

        this.createNewNoteForm()
    }

    private isNoteFormAlreadyOpen() {
        return this._noteFormInstance !== null && this._noteFormInstance.isOpen()
    }

    private createNewNoteForm() {
        const builderInstance = new NoteForm.Builder()

        for ( const listener of this._newNoteListeners ) {
            builderInstance.addNoteSubmitListener( listener )
        }

        this._noteFormInstance = builderInstance
            .setTitle( 'Add new note' )
            .build()
    }
}

export default NewNoteCreatorController