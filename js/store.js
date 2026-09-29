(function (global) {
    function createPaletteStore() {
        const state = {
            mode: 'hex',
            quantity: global.PaletteProConfig.defaultQuantity,
            palette: []
        };

        const listeners = [];

        function notify() {
            listeners.forEach((listener) => listener(state));
        }

        return {
            getState() {
                return {
                    ...state,
                    palette: [...state.palette]
                };
            },
            setMode(mode) {
                state.mode = mode === 'hsl' ? 'hsl' : 'hex';
                notify();
            },
            setQuantity(quantity) {
                state.quantity = global.PaletteProColor.normalizeQuantity(quantity);
                notify();
            },
            setPalette(palette) {
                state.palette = Array.isArray(palette) ? palette.slice() : [];
                notify();
            },
            subscribe(listener) {
                listeners.push(listener);
                return () => {
                    const index = listeners.indexOf(listener);
                    if (index >= 0) {
                        listeners.splice(index, 1);
                    }
                };
            },
            notify
        };
    }

    global.PaletteProStore = {
        createPaletteStore
    };
})(window);
