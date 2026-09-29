(function (global) {
    const CHARACTERS = '0123456789ABCDEF';

    function normalizeQuantity(value) {
        const parsed = Number.parseInt(value, 10);
        if (!Number.isFinite(parsed)) {
            return global.PaletteProConfig.defaultQuantity;
        }

        if (global.PaletteProConfig.supportedQuantities.includes(parsed)) {
            return parsed;
        }

        return global.PaletteProConfig.defaultQuantity;
    }

    function generateHexColor() {
        let color = '#';

        for (let index = 0; index < 6; index += 1) {
            color += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }

        return color;
    }

    function generateHslColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 100);
        const lightness = Math.floor(Math.random() * 100);

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    function generatePalette(mode, quantity) {
        const safeQuantity = normalizeQuantity(quantity);

        return Array.from({ length: safeQuantity }, () => {
            if (mode === 'hsl') {
                return generateHslColor();
            }

            return generateHexColor();
        });
    }

    global.PaletteProColor = {
        normalizeQuantity,
        generateHexColor,
        generateHslColor,
        generatePalette
    };
})(window);
