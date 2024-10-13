type SearchQueryListener = ( query: string ) => void;

class SearchQueryListenerManager {
    private readonly _searchQueryListeners: SearchQueryListener[] = [];

    constructor() {

    }

    public addListener( listener: SearchQueryListener ) {
        this._searchQueryListeners.push( listener );
    }

    public triggerListeners( query: string ) {
        for ( const listener of this._searchQueryListeners ) {
            listener( query );
        }
    }
}

export default SearchQueryListenerManager