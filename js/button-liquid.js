(function () {
    const button = document.getElementById('generar');
    const canvas = button ? button.querySelector('canvas') : null;
    const context = canvas ? canvas.getContext('2d') : null;

    if (!button || !canvas || !context) {
        return;
    }

    const points = [];
    const foregroundPoints = [];
    const config = {
        points: 8,
        viscosity: 20,
        mouseDistance: 70,
        damping: 0.05
    };
    let mouse = { x: -100, y: -100 };

    function createPoint(x, y, level) {
        return {
            x: 50 + x,
            y: 50 + y,
            baseX: 50 + x,
            baseY: 50 + y,
            velocityX: 0,
            velocityY: 0,
            level
        };
    }

    function buildPoints() {
        const width = button.clientWidth;
        const height = button.clientHeight;
        const radius = height / 2;

        canvas.width = width + 100;
        canvas.height = height + 100;
        points.length = 0;
        foregroundPoints.length = 0;

        function addPoint(x, y) {
            points.push(createPoint(x, y, 1));
            foregroundPoints.push(createPoint(x, y, 2));
        }

        for (let index = 1; index < config.points; index += 1) {
            addPoint(radius + ((width - height) / config.points) * index, 0);
        }
        addPoint(width - radius / 5, 0);
        addPoint(width + height / 10, height / 2);
        addPoint(width - radius / 5, height);
        for (let index = config.points - 1; index > 0; index -= 1) {
            addPoint(radius + ((width - height) / config.points) * index, height);
        }
        addPoint(height / 5, height);
        addPoint(-height / 10, height / 2);
        addPoint(height / 5, 0);
    }

    function movePoint(point) {
        point.velocityX += (point.baseX - point.x) / (config.viscosity * point.level);
        point.velocityY += (point.baseY - point.y) / (config.viscosity * point.level);

        const distanceX = mouse.x - point.x;
        const distanceY = mouse.y - point.y;
        const distance = Math.hypot(distanceX, distanceY);
        const influence = 1 - distance / config.mouseDistance;

        if (influence > 0) {
            const force = influence * 0.08 / point.level;
            point.velocityX += distanceX * force;
            point.velocityY += distanceY * force;
        }

        point.velocityX *= 1 - config.damping;
        point.velocityY *= 1 - config.damping;
        point.x += point.velocityX;
        point.y += point.velocityY;
    }

    function drawShape(shapePoints) {
        context.beginPath();
        context.moveTo(shapePoints[0].x, shapePoints[0].y);

        for (let index = 0; index < shapePoints.length; index += 1) {
            const point = shapePoints[index];
            const nextPoint = shapePoints[(index + 1) % shapePoints.length];
            const middleX = (point.x + nextPoint.x) / 2;
            const middleY = (point.y + nextPoint.y) / 2;
            context.quadraticCurveTo(point.x, point.y, middleX, middleY);
        }

        context.closePath();
        context.fill();
    }

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        points.forEach(movePoint);
        foregroundPoints.forEach(movePoint);

        context.fillStyle = '#00e5c7';
        drawShape(points);

        const gradient = context.createRadialGradient(
            mouse.x,
            mouse.y,
            0,
            mouse.x,
            mouse.y,
            canvas.width * 0.9
        );
        gradient.addColorStop(0, '#ff00d4');
        gradient.addColorStop(0.28, '#a83dff');
        gradient.addColorStop(0.52, '#ff8a3d');
        gradient.addColorStop(0.75, '#74df45');
        gradient.addColorStop(1, '#00cfc7');
        context.fillStyle = gradient;
        drawShape(foregroundPoints);

        requestAnimationFrame(render);
    }

    button.addEventListener('pointermove', function (event) {
        const bounds = canvas.getBoundingClientRect();
        mouse = {
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top
        };
    });

    button.addEventListener('pointerleave', function () {
        mouse = { x: -100, y: -100 };
    });

    window.addEventListener('resize', buildPoints);
    buildPoints();
    render();
})();