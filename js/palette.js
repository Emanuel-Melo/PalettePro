(function (global) {
    function getColorCells() {
        return Array.from(document.querySelectorAll('.color'));
    }

    function updateDropdownLabel(value) {
        const menuCantidad = document.getElementById('menuCantidad');
        if (!menuCantidad) {
            return;
        }

        const button = menuCantidad.querySelector('.dropdown-toggle');
        const label = button ? button.querySelector('span') : null;
        if (!label) {
            return;
        }

        const text = value === '6' ? '6 colores' : value === '8' ? '8 colores' : '9 colores';
        label.textContent = text;
    }

    function renderPalette(store) {
        const state = store.getState();
        const cells = getColorCells();
        const placeholder = document.querySelector('.palette-placeholder');

        if (placeholder) {
            placeholder.hidden = state.palette.length > 0;
        }

        cells.forEach((cell, index) => {
            if (index < state.palette.length) {
                const color = state.palette[index];
                const details = global.PaletteProColor.getColorDetails(color);
                const preview = cell.querySelector('.swatch-preview');
                const code = cell.querySelector('.swatch-code');
                const copyButton = cell.querySelector('.copy-color');

                if (!details) {
                    cell.hidden = true;
                    return;
                }

                preview.style.backgroundColor = color;
                cell.style.setProperty('--swatch-color', details.hex);
                code.textContent = color;
                cell.querySelector('.swatch-rgb').textContent = details.rgb;
                cell.querySelector('.swatch-hsl').textContent = details.hsl;
                cell.dataset.originalText = color;
                copyButton.setAttribute('aria-label', `Copiar ${color}`);
                copyButton.title = `Copiar ${color}`;
                cell.hidden = false;
            } else {
                cell.hidden = true;
                cell.dataset.originalText = '';
            }
        });
    }

    function bindColorClicks() {
        const cells = getColorCells();

        cells.forEach((cell) => {
            cell.addEventListener('click', async function () {
                const text = cell.dataset.originalText;
                const button = cell.querySelector('.copy-color');
                if (!text) {
                    return;
                }

                try {
                    await global.PaletteProClipboard.copyText(text);
                    button.setAttribute('aria-label', 'Color copiado');
                    button.title = 'Color copiado';
                    button.classList.add('is-copied');
                    setTimeout(() => {
                        button.setAttribute('aria-label', `Copiar ${text}`);
                        button.title = `Copiar ${text}`;
                        button.classList.remove('is-copied');
                    }, global.PaletteProConfig.copyResetDelay);
                } catch (error) {
                    console.error('Error al copiar color:', error);
                }
            });
        });
    }

    function initPaletteUI(store) {
        const select = document.getElementById('cantidad');
        const menuCantidad = document.getElementById('menuCantidad');
        const buttonCantidad = menuCantidad ? menuCantidad.querySelector('.dropdown-toggle') : null;
        const options = menuCantidad ? menuCantidad.querySelectorAll('li a') : [];

        if (select) {
            select.value = String(store.getState().quantity);
        }

        if (buttonCantidad) {
            buttonCantidad.addEventListener('click', function () {
                const isOpen = menuCantidad.classList.toggle('active');
                buttonCantidad.setAttribute('aria-expanded', String(isOpen));
            });
        }

        options.forEach((option) => {
            option.addEventListener('click', function (event) {
                event.preventDefault();

                const value = String(option.dataset.value || '6');
                if (select) {
                    select.value = value;
                }

                store.setQuantity(value);
                updateDropdownLabel(value);

                if (menuCantidad) {
                    menuCantidad.classList.remove('active');
                }

                if (buttonCantidad) {
                    buttonCantidad.setAttribute('aria-expanded', 'false');
                }
            });
        });

        document.addEventListener('click', function (event) {
            if (!menuCantidad || !buttonCantidad) {
                return;
            }

            if (!menuCantidad.contains(event.target)) {
                menuCantidad.classList.remove('active');
                buttonCantidad.setAttribute('aria-expanded', 'false');
            }
        });

        bindColorClicks();
        renderPalette(store);
        store.subscribe(() => {
            renderPalette(store);
            const currentQuantity = String(store.getState().quantity);
            if (select) {
                select.value = currentQuantity;
            }
            updateDropdownLabel(currentQuantity);
        });
    }

    global.PaletteProPalette = {
        renderPalette,
        initPaletteUI
    };
})(window);
