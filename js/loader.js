(function () {
    const loader = document.getElementById('page-loader');
    const progressBar = document.querySelector('.loader-progress');
    const progressFill = document.getElementById('loader-progress-fill');
    const percentageLabel = document.getElementById('loader-percentage');
    const duration = 2800;

    if (!loader || !progressBar || !progressFill || !percentageLabel) {
        return;
    }

    const startTime = performance.now();

    function updateProgress(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const percentage = Math.floor(progress * 100);

        progressFill.style.width = `${progress * 100}%`;
        progressBar.setAttribute('aria-valuenow', String(percentage));
        percentageLabel.textContent = `${percentage}%`;

        if (progress < 1) {
            requestAnimationFrame(updateProgress);
            return;
        }

        window.setTimeout(function () {
            document.body.classList.remove('is-loading');
            document.body.classList.add('is-ready');
            loader.setAttribute('aria-hidden', 'true');
        }, 300);
    }

    requestAnimationFrame(updateProgress);
})();