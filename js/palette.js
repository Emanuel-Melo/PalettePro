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

        cells.forEach((cell, index) => {
            if (index < state.palette.length) {
                const color = state.palette[index];
                cell.style.backgroundColor = color;
                cell.textContent = color;
                cell.dataset.originalText = color;
                cell.style.display = 'flex';
            } else {
                cell.style.display = 'none';
                cell.textContent = '';
                cell.dataset.originalText = '';
            }
        });
    }

    function bindColorClicks() {
        const cells = getColorCells();

        cells.forEach((cell) => {
            cell.addEventListener('click', async function () {
                const text = cell.dataset.originalText || cell.textContent;
                if (!text) {
                    return;
                }

                try {
                    await global.PaletteProClipboard.copyText(text);
                    const previousText = cell.textContent;
                    cell.textContent = 'Copiado ✅';
                    setTimeout(() => {
                        cell.textContent = previousText;
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
