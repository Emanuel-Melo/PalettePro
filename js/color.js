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

    function getColorDetails(color) {
        let red;
        let green;
        let blue;
        let hslDetails;

        if (color.startsWith('#')) {
            const hex = color.slice(1);
            red = Number.parseInt(hex.slice(0, 2), 16);
            green = Number.parseInt(hex.slice(2, 4), 16);
            blue = Number.parseInt(hex.slice(4, 6), 16);
        } else {
            const match = color.match(/^hsl\(\s*(-?[\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i);
            if (!match) {
                return null;
            }

            const hueDegrees = ((Number(match[1]) % 360) + 360) % 360;
            const hue = hueDegrees / 360;
            const saturation = Math.min(100, Number(match[2])) / 100;
            const lightness = Math.min(100, Number(match[3])) / 100;
            hslDetails = `HSL ${Math.round(hueDegrees)}° ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%`;
            const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
            const secondary = chroma * (1 - Math.abs((hue * 6) % 2 - 1));
            const offset = lightness - chroma / 2;
            const section = Math.floor(hue * 6);
            const channels = [
                [chroma, secondary, 0],
                [secondary, chroma, 0],
                [0, chroma, secondary],
                [0, secondary, chroma],
                [secondary, 0, chroma],
                [chroma, 0, secondary]
            ][section % 6];

            [red, green, blue] = channels.map((channel) => Math.round((channel + offset) * 255));
        }

        const hex = `#${[red, green, blue].map((channel) => channel.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
        const normalizedRed = red / 255;
        const normalizedGreen = green / 255;
        const normalizedBlue = blue / 255;
        const maximum = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
        const minimum = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
        const difference = maximum - minimum;
        const lightness = (maximum + minimum) / 2;
        let hue = 0;
        let saturation = 0;

        if (difference !== 0) {
            saturation = difference / (1 - Math.abs(2 * lightness - 1));
            if (maximum === normalizedRed) {
                hue = ((normalizedGreen - normalizedBlue) / difference) % 6;
            } else if (maximum === normalizedGreen) {
                hue = (normalizedBlue - normalizedRed) / difference + 2;
            } else {
                hue = (normalizedRed - normalizedGreen) / difference + 4;
            }
            hue *= 60;
            if (hue < 0) {
                hue += 360;
            }
        }

        return {
            hex,
            rgb: `RGB ${red} ${green} ${blue}`,
            hsl: hslDetails || `HSL ${Math.round(hue)}° ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%`
        };
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
        getColorDetails,
        generatePalette
    };
})(window);
