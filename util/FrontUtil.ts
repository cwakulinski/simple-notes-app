class FrontUtil {
    public static parseHTMLStringIntoNode( htmlText: string ) {
        const nodes = FrontUtil.parseHTMLStringIntoNodes( htmlText );
        const outputNode = nodes[ 0 ]

        if ( !outputNode ) {
            throw new Error( 'HTML string not parsable' )
        }


        return outputNode
    }

    public static parseHTMLStringIntoNodes( htmlText: string ) {
        const parser = new DOMParser();
        const doc = parser.parseFromString( htmlText, 'text/html' );

        return Array.from( doc.body.children )
    }

    public static get appRoot() {
        const root = document.querySelector( '.app' )

        if ( !( root instanceof HTMLElement ) ) {
            throw new Error( 'Root not found' );
        }

        return root
    }

    public static getAppElement( selector: string ): Element {
        const querySelectorOutput = this.appRoot.querySelector( selector );
        if ( querySelectorOutput ) {
            return querySelectorOutput
        }

        if ( this.appRoot.matches( selector ) ) {
            return this.appRoot
        }


        throw new Error( 'App does not contains requested element' );
    }
}

export default FrontUtil;