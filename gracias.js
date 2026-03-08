const canvas = document.getElementById('particleCanvas');
const ctx    = canvas ? canvas.getContext('2d') : null;

if (canvas && ctx) {

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width  = W;
        canvas.height = H;
    });

    const PARTICLE_COUNT = 45;
    const MAX_DIST       = 115;
    const particles      = [];

    class Particle {
        constructor() { this.reset(); }

        reset() {
            this.x       = Math.random() * W;
            this.y       = Math.random() * H;
            this.size    = Math.random() * 1.4 + 0.3;
            this.speedX  = (Math.random() - 0.5) * 0.28;
            this.speedY  = (Math.random() - 0.5) * 0.28;
            this.opacity = Math.random() * 0.45 + 0.1;
            this.color   = Math.random() > 0.55 ? '#1cb698' : '#0dda40';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle   = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = '#1cb698';
                    ctx.globalAlpha = (1 - dist / MAX_DIST) * 0.1;
                    ctx.lineWidth   = 0.5;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();
}