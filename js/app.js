(function (global) {
    function initApp() {
        const store = global.PaletteProStore.createPaletteStore();
        const { generatePalette } = global.PaletteProColor;
        const { initPaletteUI } = global.PaletteProPalette;

        initPaletteUI(store);

        const button = document.getElementById('generar');
        const radios = Array.from(document.getElementsByName('mode'));
        const select = document.getElementById('cantidad');

        radios.forEach((radio) => {
            radio.addEventListener('change', function () {
                store.setMode(radio.value);
            });
        });

        if (select) {
            select.addEventListener('change', function () {
                store.setQuantity(select.value);
            });
        }

        button.addEventListener('click', async function () {
            button.disabled = true;

            try {
                await global.PaletteProLoader.show(function () {
                    const currentState = store.getState();
                    const nextPalette = generatePalette(currentState.mode, currentState.quantity);
                    store.setPalette(nextPalette);
                });
            } finally {
                button.disabled = false;
            }
        });

    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})(window);
