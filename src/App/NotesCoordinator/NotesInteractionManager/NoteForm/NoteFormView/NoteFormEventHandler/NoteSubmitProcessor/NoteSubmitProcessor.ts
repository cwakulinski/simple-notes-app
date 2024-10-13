
import NsNoteForm from '@Src/App/NotesCoordinator/NotesInteractionManager/NoteForm/namespace';
import Note from '@Src/App/NotesCoordinator/NoteService/Note';

class NoteSubmitProcessor {
    constructor() {

    }

    public processSubmit(event: Event): Note | null {
        const target = event.target;
        if (!(target instanceof HTMLFormElement)) {
            return null;
        }

        return this.createNoteFromForm(target);
    }

    private createNoteFromForm(form: HTMLFormElement): Note {
        const formData = new FormData(form);

        const noteBuilder = new Note.Builder();

        const noteTitleValue = formData.get(NsNoteForm.kFormTitleInputName);
        if (typeof noteTitleValue === 'string') {
            noteBuilder.setTitle(noteTitleValue);
        }

        const noteContentValue = formData.get(NsNoteForm.kFormContentInputName);
        if (typeof noteContentValue === 'string') {
            noteBuilder.setContent(noteContentValue);
        }

        return noteBuilder.build();
    }
}

export default NoteSubmitProcessor;