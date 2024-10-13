import FrontUtil from '@Util/FrontUtil';
import NsNotesViewController from '@Src/App/NotesCoordinator/NotesInteractionManager/NotesViewController/namespace';


class NotesViewController {
    private readonly _controlElement = this.getViewControlElement();

    constructor() {
        /* No notes view init assumed */
        this.showNoNotesView()
    }

    private getViewControlElement() {
        return FrontUtil.getAppElement(`.${ NsNotesViewController.kNotesViewControlElementClass }`)
    }

    public showNoNotesView(): void {
        this.setControlAttribute(NsNotesViewController.kNoNotesViewControlValue)
    }

    public showStdNotesView(): void {
        this.setControlAttribute(NsNotesViewController.kStdViewControlValue)
    }

    private setControlAttribute(value: string) {
        if( !this._controlElement) {
            return /* Nothing to control */
        }

        this._controlElement.setAttribute(NsNotesViewController.kNotesViewControlAttributeName, value);
    }
}

export default NotesViewController;