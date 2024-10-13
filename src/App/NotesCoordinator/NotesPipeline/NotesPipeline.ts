import Note from '@Src/App/NotesCoordinator/NoteService/Note';


class NotesPipeline {
    private _notes: Note[] = []

    constructor() {

    }

    public setCollection( notes: Note[] ): this {
        this._notes = notes;

        return this;
    }

    public filterByString( input: string ): this {
        this._notes = this._notes.filter( ( note ) => note.title.includes( input ) || note.content.includes( input ) )

        return this;
    }

    public getOutput() {
        return this._notes;
    }
}

export default NotesPipeline;