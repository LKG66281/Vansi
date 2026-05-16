// THEME TOGGLE

function toggleTheme() {

    const body =
        document.body

    const toggleBtn =
        document.querySelector(
            '.theme-toggle'
        )

    if (
        body.classList.contains(
            'dark'
        )
    ) {

        body.classList.remove(
            'dark'
        )

        body.classList.add(
            'light'
        )

        if (toggleBtn)
            toggleBtn.textContent =
                '🌙'

    } else {

        body.classList.remove(
            'light'
        )

        body.classList.add(
            'dark'
        )

        if (toggleBtn)
            toggleBtn.textContent =
                '☀️'
    }
}

// =========================
// RESPONSIVE TRAIL SYSTEM
// =========================

function initMouseTrail() {

    const canvas =
        document.getElementById(
            'mouse-trail'
        )

    if (!canvas) return

    const ctx =
        canvas.getContext('2d')

    let width = 0
    let height = 0

    let particles = []

    let pointer = {

        x: 0,
        y: 0,

        prevX: 0,
        prevY: 0
    }

    // =========================
    // PARTICLE CLASS
    // =========================

    class Particle {

        constructor(
            x,
            y,
            color
        ) {

            this.x = x
            this.y = y

            const motionScale =
                Math.max(
                    window.innerWidth / 1400,
                    1
                )

            this.vx =
                (Math.random() - 0.5)
                * 4
                * motionScale

            this.vy =
                (Math.random() - 0.5)
                * 4
                * motionScale

            this.life =
                80 + Math.random() * 50

            this.color = color

            const scaleFactor =
                Math.min(
                    window.innerWidth,
                    window.innerHeight
                ) / 1000

            this.size =
                (
                    Math.random() * 8 + 6
                ) * Math.max(
                    scaleFactor,
                    1
                )
        }

        update() {

            this.x += this.vx
            this.y += this.vy

            this.vx *= 0.98
            this.vy *= 0.98

            this.life--
        }

        draw() {

            const alpha =
                this.life / 120

            ctx.save()

            ctx.globalAlpha = alpha

            ctx.fillStyle =
                this.color

            ctx.shadowBlur =
                Math.max(
                    window.innerWidth / 50,
                    25
                )

            ctx.shadowColor =
                this.color

            ctx.beginPath()

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            )

            ctx.fill()

            ctx.restore()
        }
    }

    // =========================
    // RESIZE
    // =========================

    function resize() {

        width =
            canvas.width =
            window.innerWidth

        height =
            canvas.height =
            window.innerHeight
    }

    // =========================
    // SPAWN PARTICLES
    // =========================

    function spawnParticles(
        x,
        y
    ) {

        const isDark =
            document.body
            .classList
            .contains('dark')

        const trailColor =
            isDark
            ? (
                Math.random() > 0.5
                ? '#00f5ff'
                : '#ff00ff'
            )
            : (
                Math.random() > 0.5
                ? '#0066ff'
                : '#8a2be2'
            )

        const particleBurst =
            Math.max(
                Math.floor(
                    window.innerWidth / 250
                ),
                8
            )

        for (
            let i = 0;
            i < particleBurst;
            i++
        ) {

            particles.push(

                new Particle(
                    x,
                    y,
                    trailColor
                )
            )
        }
    }

    // =========================
    // ANIMATE
    // =========================

    function animate() {

        ctx.fillStyle =
            document.body
            .classList
            .contains('dark')
            ? 'rgba(10,10,15,0.10)'
            : 'rgba(240,244,255,0.10)'

        ctx.fillRect(
            0,
            0,
            width,
            height
        )

        for (
            let i = particles.length - 1;
            i >= 0;
            i--
        ) {

            particles[i].update()

            particles[i].draw()

            if (
                particles[i].life <= 0
            ) {

                particles.splice(i, 1)
            }
        }

        requestAnimationFrame(
            animate
        )
    }

    // =========================
    // MOUSE SUPPORT
    // =========================

    window.addEventListener(
        'mousemove',
        e => {

            pointer.x =
                e.clientX

            pointer.y =
                e.clientY

            if (

                Math.hypot(

                    pointer.x -
                    pointer.prevX,

                    pointer.y -
                    pointer.prevY

                ) > 8

            ) {

                spawnParticles(
                    pointer.x,
                    pointer.y
                )

                pointer.prevX =
                    pointer.x

                pointer.prevY =
                    pointer.y
            }
        }
    )

    // =========================
    // TOUCH SUPPORT
    // =========================

    window.addEventListener(
        'touchmove',
        e => {

            const touch =
                e.touches[0]

            if (!touch) return

            pointer.x =
                touch.clientX

            pointer.y =
                touch.clientY

            if (

                Math.hypot(

                    pointer.x -
                    pointer.prevX,

                    pointer.y -
                    pointer.prevY

                ) > 8

            ) {

                spawnParticles(
                    pointer.x,
                    pointer.y
                )

                pointer.prevX =
                    pointer.x

                pointer.prevY =
                    pointer.y
            }
        },
        { passive: true }
    )

    window.addEventListener(
        'resize',
        resize
    )

    resize()

    animate()
}

// =========================
// INIT
// =========================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        initMouseTrail()

        document.addEventListener(
            'keydown',
            e => {

                if (
                    e.key.toLowerCase()
                    === 't'
                ) {

                    toggleTheme()
                }
            }
        )
    }
)
