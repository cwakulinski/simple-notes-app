type ConfirmListener = () => void;

class ConfirmListenerManager {
    private _confirmListeners: ConfirmListener[] = [];

    constructor() {

    }

    public triggerConfirmListeners() {
        for(const listener of this._confirmListeners) {
            listener()
        }
    }

    public addConfirmListener(listener: ConfirmListener) {
        this._confirmListeners.push(listener);
    }
}

export default ConfirmListenerManager;