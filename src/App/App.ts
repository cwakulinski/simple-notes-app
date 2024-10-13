import NotesCoordinator from '@Src/App/NotesCoordinator/NotesCoordinator';

class App {
    private readonly _notesCoordinator = new NotesCoordinator();

    /* Place for non-notes content to initialize, like auth or fb pixel */

    constructor() {

    }
}

export default App;