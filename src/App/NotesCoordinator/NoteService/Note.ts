class Note {
    private static readonly idGenerator = Note.IdGenerator();

    private readonly _id = this.generateId();
    private _title: string = ''
    private _content: string = ''
    private _creationDate: Date = new Date();

    /*
     * Avoiding constructor parameters to prevent the need
     * for constantly checking parameter order. It's manageable now, but as the app
     * scales and more parameters are added, it becomes more difficult to keep track.
     * Instead, I'm using setters or a builder pattern to maintain clarity and flexibility.
     */



    constructor(
        // private title: string = '',
        // private content: string = ''
    ) {

    }

    private static* IdGenerator(): Generator<number, never, unknown> {
        let id = 0;
        while ( true ) {
            yield id++;
        }
    }

    private generateId(): number {
        return Note.idGenerator.next().value
    }

    public get id(): number {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get content(): string {
        return this._content;
    }

    public get creationDate(): Date {
        return this._creationDate;
    }

    public clone(): Note {
        const clonedNote = Object.assign(new Note(), this);

        clonedNote._creationDate = new Date(this._creationDate);

        return clonedNote;
    }

    public static Builder = class {
        private _note: Note | null = null;

        constructor() {

        }

        private get note(): Note {
            if(this._note === null) {
                this._note = new Note();
            }

            return this._note;
        }

        private buildCleanup() {
            this._note = null;
        }

        public edit(existingNote: Note): this {
            this._note = existingNote.clone();
            return this;
        }


        public setTitle(title: string): this {
            this.note._title = title;
            return this;
        }

        public setContent(content: string): this {
            this.note._content = content;
            return this;
        }

        public build(): Note {
            this.setCreationDate()

            return this.getBuiltNote()
        }

        private setCreationDate() {
            this.note._creationDate = new Date();

            return this;
        }

        private getBuiltNote() {
            const output = this.note;

            this.buildCleanup()

            return output;
        }
    };

}

export default Note;