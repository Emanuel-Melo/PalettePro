(function (global) {
    async function copyText(text) {
        if (!text) {
            return false;
        }

        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        const helper = document.createElement('textarea');
        helper.value = text;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.top = '-9999px';
        helper.style.left = '-9999px';
        document.body.appendChild(helper);
        helper.select();

        const copied = document.execCommand('copy');
        document.body.removeChild(helper);

        return copied;
    }

    global.PaletteProClipboard = {
        copyText
    };
})(window);
