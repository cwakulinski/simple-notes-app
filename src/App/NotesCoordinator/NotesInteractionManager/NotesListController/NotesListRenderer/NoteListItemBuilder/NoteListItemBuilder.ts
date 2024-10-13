import FrontUtil from '@Util/FrontUtil';

import Note from '@Src/App/NotesCoordinator/NoteService/Note';
import NsNoteListItemBuilder
    from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesListController/NotesListRenderer/NoteListItemBuilder/namespace';

class NoteListItemBuilder {
    private _noteItemTemplateElement: Element = this.getTemplateElement()
    private _note: Note | null = null;

    constructor() {

    }

    public setNoteData( note: Note ): this {
        this._note = note;

        return this;
    }

    private get note() {
        if ( this._note === null ) {
            throw new Error( 'Note data is missing. Please specify note details before building' )
        }

        return this._note
    }

    public build(): Element {
        this.setDataIntoTemplateElement()

        const output = this._noteItemTemplateElement

        this.resetTemplateElement();

        return output;
    }

    private setDataIntoTemplateElement(): void {
        this.setNoteElementIdData()
        this.setNoteElementTitle()
        this.setNoteElementContent()
        this.setNoteElementCreationData()

    }

    private setNoteElementIdData() {
        this._noteItemTemplateElement.setAttribute( NsNoteListItemBuilder.kNoteIdAttributeName, this.note.id.toString() );
    }

    private setNoteElementTitle(): void {
        const titleTextNode = this._noteItemTemplateElement.querySelector( `.${ NsNoteListItemBuilder.kTitleTextElementClass }` )
        if ( !titleTextNode ) {
            return
        }

        titleTextNode.textContent = this.note.title
    }

    private setNoteElementContent(): void {
        const contentTextNode = this._noteItemTemplateElement.querySelector( `.${ NsNoteListItemBuilder.kContentTextElementClass }` )
        if ( !contentTextNode ) {
            return
        }

        contentTextNode.textContent = this.note.content
    }

    private setNoteElementCreationData(): void {
        const creationDateTextNode = this._noteItemTemplateElement.querySelector( `.${ NsNoteListItemBuilder.kCreationDateTextElementClass }` )
        if ( !creationDateTextNode ) {
            return
        }

        creationDateTextNode.textContent = this.getNoteParsedDateText()
    }


    private getNoteParsedDateText(): string {
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        const formattedDate = this.note.creationDate.toLocaleDateString( 'en-US', options );

        return formattedDate
    }

    private resetTemplateElement() {
        this._noteItemTemplateElement = this.getTemplateElement()
    }

    private getTemplateElement() {
        return FrontUtil.parseHTMLStringIntoNode( require( '@Static/template/NoteListItem/index.pug' ).default )
    }

    public static getNoteIdByBuiltElement( inputElement: Element ): number {
        const idAttrValue = inputElement.getAttribute( NsNoteListItemBuilder.kNoteIdAttributeName )
        if ( idAttrValue === null ) {
            throw new Error( 'Note id not present on element' )
        }

        const parsedId = parseInt(idAttrValue)
        if(isNaN(parsedId)) {
            throw new Error( 'Note id is not an integer' )
        }

        return parsedId;
    }

}

export default NoteListItemBuilder