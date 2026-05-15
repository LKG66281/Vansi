// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const icon = document.querySelector('.theme-toggle');
    
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        if (icon) icon.textContent = '☀️';
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        if (icon) icon.textContent = '🌙';
    }
}

// Navigation Logic
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from all
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
            
            // Show selected section
            const sectionId = item.getAttribute('data-section');
            const activeSection = document.getElementById(sectionId);
            if (activeSection) activeSection.classList.add('active');
        });
    });
}

// Background Particles (Advanced)
function initParticles() {
    const canvas = document.getElementById('bg-particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = (Math.random() - 0.5) * 1.2;
            this.radius = Math.random() * 6 + 4;
            this.hue = Math.random() > 0.5 ? 190 : 280;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            const grad = ctx.createRadialGradient(
                this.x - this.radius*0.4, this.y - this.radius*0.4, this.radius*0.2,
                this.x, this.y, this.radius*1.4
            );
            grad.addColorStop(0, `hsla(${this.hue}, 90%, 85%, 0.9)`);
            grad.addColorStop(1, `hsla(${this.hue}, 70%, 45%, 0.25)`);

            ctx.save();
            ctx.shadowBlur = 18;
            ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();
        }
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function animate() {
        ctx.fillStyle = document.body.classList.contains('light') 
            ? 'rgba(240,244,255,0.12)' 
            : 'rgba(10,10,15,0.18)';
        ctx.fillRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        const target = Math.floor((width * height) / 14000);
        while (particles.length < target) particles.push(new Particle());
    });

    resize();
    const target = Math.floor((width * height) / 14000);
    for (let i = 0; i < target; i++) particles.push(new Particle());
    animate();
}

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParticles();
    
    // Keyboard shortcut
    document.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 't') toggleTheme();
    });
});