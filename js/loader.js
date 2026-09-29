(function () {
    const loader = document.getElementById('page-loader');
    const progressBar = document.querySelector('.loader-progress');
    const progressFill = document.getElementById('loader-progress-fill');
    const percentageLabel = document.getElementById('loader-percentage');
    const duration = 2800;
    let isRunning = false;

    if (!loader || !progressBar || !progressFill || !percentageLabel) {
        return;
    }

    function show(onComplete) {
        if (isRunning) {
            return Promise.resolve(false);
        }

        isRunning = true;
        document.body.classList.remove('is-ready');
        document.body.classList.add('is-loading');
        loader.setAttribute('aria-hidden', 'false');
        progressFill.style.width = '0%';
        progressBar.setAttribute('aria-valuenow', '0');
        percentageLabel.textContent = '0%';

        return new Promise(function (resolve, reject) {
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
                    try {
                        if (onComplete) {
                            onComplete();
                        }
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    } finally {
                        document.body.classList.remove('is-loading');
                        document.body.classList.add('is-ready');
                        loader.setAttribute('aria-hidden', 'true');
                        isRunning = false;
                    }
                }, 300);
            }

            requestAnimationFrame(updateProgress);
        });
    }

    window.PaletteProLoader = { show };
    show();
})();