import NoteFormView from '@Src/App/NotesCoordinator/NotesInteractionManager/NoteForm/NoteFormView/NoteFormView';
import Note from '@Src/App/NotesCoordinator/NoteService/Note';



class NoteForm {
    private _view: NoteFormView = new NoteFormView()


    constructor() {

    }

    public isOpen(): boolean {
        return this._view.isOpen()
    }

    public static Builder = class {
        private _noteForm: NoteForm | null = new NoteForm()

        constructor() {

        }

        private get noteForm(): NoteForm {
            if(this._noteForm === null) {
                this._noteForm = new NoteForm();
            }

            return this._noteForm;
        }

        private buildCleanup() {
            this._noteForm = null;
        }

        public setTitle(title: string): this {
            this.noteForm._view.setTitle( title )

            return this;
        }

        public setDefaultNoteData(note: Note): this {
            this.noteForm._view.setDefaultNoteData( note )

            return this;
        }

        public addNoteSubmitListener( ...args: Parameters<NoteFormView['addNoteSubmitListener']> ): this {
            this.noteForm._view.addNoteSubmitListener( ...args );

            return this;
        }

        public build() {
            const output = this.noteForm;

            this.buildCleanup();

            return output;
        }
    }
}

export default NoteForm;