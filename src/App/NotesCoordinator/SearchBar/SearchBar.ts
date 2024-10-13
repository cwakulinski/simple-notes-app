import SearchQueryListenerManager
    from '@Src/App/NotesCoordinator/SearchBar/SearchQueryListenerManager/SearchQueryListenerManager';
import FrontUtil from '@Util/FrontUtil';
import NsSearchBar from '@Src/App/NotesCoordinator/SearchBar/namespace';


class SearchBarController {
    private readonly _searchQueryListenerManager: SearchQueryListenerManager = new SearchQueryListenerManager();
    private readonly _queryInput = this.getQueryInput()

    constructor() {
        this.initListeners()
    }


    private getQueryInput() {
        const output = FrontUtil.appRoot
            ?.querySelector( `.${ NsSearchBar.kRootElementClass }` )
            ?.querySelector( `.${ NsSearchBar.kQueryInputClass }` )

        if(!(output instanceof HTMLInputElement)) {
            throw new Error('Unable to extract query Input')
        }

        return output
    }

    private initListeners() {
        this._queryInput.addEventListener('keyup', this.triggerSearchQueryListeners.bind( this ) )
    }

    private triggerSearchQueryListeners() {
        this._searchQueryListenerManager.triggerListeners( this.getSearchQuery() );
    }

    public getSearchQuery(): string {
        return this._queryInput.value
    }

    public onSearchQuerySubmit( ...args: Parameters<SearchQueryListenerManager['addListener']> ) {
        this._searchQueryListenerManager.addListener( ...args );
    }
}

export default SearchBarController;