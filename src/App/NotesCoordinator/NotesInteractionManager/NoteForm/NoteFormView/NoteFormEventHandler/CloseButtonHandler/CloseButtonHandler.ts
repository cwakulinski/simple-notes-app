import NsNoteForm from '@Src/App/NotesCoordinator/NotesInteractionManager/NoteForm/namespace';

class CloseButtonHandler {
    public isCloseButtonClicked(event: Event): boolean {
        const target = event.target;
        if ( !( target instanceof Element ) ) {
            return false
        }

        const closeBtn = target.closest( `.${ NsNoteForm.kFormCloseBtnClass }` )
        if ( !( closeBtn instanceof HTMLElement ) ) {
            return false
        }

        return true
    }
}

export default CloseButtonHandler