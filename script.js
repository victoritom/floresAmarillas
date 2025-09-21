document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('sunflowerCanvas');
    // Verificación para asegurar que el canvas existe
    if (!canvas) {
        console.error("No se encontró el elemento canvas con ID 'sunflowerCanvas'");
        return;
    }
    const ctx = canvas.getContext('2d');
    let drawing = false; // Para controlar si el dibujo está en proceso

    function drawPetal(x, y, radiusX, radiusY, rotation, color, delay) {
        setTimeout(() => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.5; // Líneas muy finas
            ctx.beginPath();
            ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2);
            ctx.stroke();
        }, delay);
    }

    function drawCircle(x, y, radius, color, delay) {
        setTimeout(() => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.5; // Líneas finas
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.stroke();
        }, delay);
    }

    // Función para dibujar el tallo del girasol
    function drawStem(centerX, centerY, length, delay) {
        setTimeout(() => {
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 2; // Un poco más grueso para el tallo
            ctx.beginPath();
            ctx.moveTo(centerX, centerY + 40); // Inicia desde el centro del girasol (debajo)
            ctx.lineTo(centerX, centerY + 40 + length); // Largo del tallo
            ctx.stroke();
        }, delay);
    }

    function drawSunflower(centerX, centerY, delayOffset) {
        const petalColor = 'yellow';
        const centerColor = 'brown';

        // Dibuja los pétalos
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 18; j++) {
                const angle = (i * Math.PI * 2) / 16;
                const petalRadius = 50 - j * 3;
                const petalX = centerX + Math.cos(angle) * 40;
                const petalY = centerY + Math.sin(angle) * 40;

                drawPetal(petalX, petalY, petalRadius, petalRadius / 2, angle, petalColor, delayOffset + i * 100 + j * 20);
            }
        }

        // Dibuja la parte central (semillas)
        const phi = 137.508 * (Math.PI / 180);
        for (let i = 0; i < 150; i++) {
            const r = 2 * Math.sqrt(i);
            const theta = i * phi;
            const x = centerX + r * Math.cos(theta);
            const y = centerY + r * Math.sin(theta);

            drawCircle(x, y, 2, centerColor, delayOffset + 1600 + i * 10);
        }

        // Dibuja el tallo después de dibujar el girasol
        drawStem(centerX, centerY, 100, delayOffset + 2500);
    }

    function drawBouquet() {
        if (drawing) return; // Evitar que se dibuje mientras ya está en proceso
        drawing = true;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el lienzo

        // Dibuja tres girasoles con sus tallos
        drawSunflower(200, 200, 0);     // Girasol 1
        drawSunflower(400, 200, 2000);  // Girasol 2
        drawSunflower(300, 400, 4000);  // Girasol 3

        // Restablece la bandera 'drawing' después de que la animación termine
        // El último setTimeout es el del tallo del tercer girasol
        setTimeout(() => {
            drawing = false;
        }, 4000 + 2500 + 10);
    }
    const drawButton = document.getElementById('drawButton');
    if (drawButton) {
        drawButton.addEventListener('click', drawBouquet);
    } else {
        console.error("No se encontró el botón con ID 'drawButton'");
    }
});
