// THEME TOGGLE

function toggleTheme() {

    const body =
        document.body

    const icon =
        document.querySelector(
            '.theme-toggle'
        )

    if (
        body.classList.contains(
            'light'
        )
    ) {

        body.classList.remove(
            'light'
        )

        body.classList.add(
            'dark'
        )

        if (icon)
            icon.textContent =
                '☀️'

    } else {

        body.classList.remove(
            'dark'
        )

        body.classList.add(
            'light'
        )

        if (icon)
            icon.textContent =
                '🌙'
    }
}

// =========================
// NAVIGATION
// =========================

function initNavigation() {

    document
        .querySelectorAll('.nav-item')
        .forEach(item => {

            item.addEventListener(
                'click',
                () => {

                    document
                        .querySelectorAll(
                            '.nav-item'
                        )
                        .forEach(i => {

                            i.classList.remove(
                                'active'
                            )
                        })

                    item.classList.add(
                        'active'
                    )

                    document
                        .querySelectorAll(
                            '.content-section'
                        )
                        .forEach(sec => {

                            sec.classList.remove(
                                'active'
                            )
                        })

                    const sectionId =
                        item.getAttribute(
                            'data-section'
                        )

                    const activeSection =
                        document.getElementById(
                            sectionId
                        )

                    if (activeSection)
                        activeSection.classList.add(
                            'active'
                        )
                }
            )
        })
}

// =========================
// RESPONSIVE PARTICLES
// =========================

function initParticles() {

    const canvas =
        document.getElementById(
            'bg-particles'
        )

    if (!canvas) return

    const ctx =
        canvas.getContext('2d')

    let particles = []

    let width
    let height

    class Particle {

        constructor() {

            this.reset()
        }

        reset() {

            this.x =
                Math.random() * width

            this.y =
                Math.random() * height

            const motionScale =
                Math.max(
                    width / 1600,
                    1
                )

            this.vx =
                (Math.random() - 0.5)
                * 2
                * motionScale

            this.vy =
                (Math.random() - 0.5)
                * 2
                * motionScale

            const screenScale =
                Math.min(width, height)
                / 1000

            this.radius =
                (
                    Math.random() * 12 + 8
                ) * Math.max(
                    screenScale,
                    1
                )

            this.hue =
                Math.random() > 0.5
                ? 190
                : 280
        }

        update() {

            this.x += this.vx
            this.y += this.vy

            if (
                this.x < 0 ||
                this.x > width
            ) {

                this.vx *= -1
            }

            if (
                this.y < 0 ||
                this.y > height
            ) {

                this.vy *= -1
            }
        }

        draw() {

            const grad =
                ctx.createRadialGradient(

                    this.x -
                    this.radius * 0.4,

                    this.y -
                    this.radius * 0.4,

                    this.radius * 0.2,

                    this.x,
                    this.y,

                    this.radius * 1.6
                )

            grad.addColorStop(
                0,
                `hsla(${this.hue},
                90%,85%,0.95)`
            )

            grad.addColorStop(
                1,
                `hsla(${this.hue},
                70%,45%,0.25)`
            )

            ctx.save()

            ctx.shadowBlur =
                Math.max(
                    width / 50,
                    30
                )

            ctx.shadowColor =
                `hsl(${this.hue},
                100%,70%)`

            ctx.beginPath()

            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            )

            ctx.fillStyle = grad

            ctx.fill()

            ctx.restore()
        }
    }

    function resize() {

        width =
            canvas.width =
            window.innerWidth

        height =
            canvas.height =
            window.innerHeight
    }

    function animate() {

        ctx.fillStyle =
            document.body
            .classList
            .contains('light')
            ? 'rgba(240,244,255,0.08)'
            : 'rgba(10,10,15,0.10)'

        ctx.fillRect(
            0,
            0,
            width,
            height
        )

        particles.forEach(p => {

            p.update()
            p.draw()
        })

        requestAnimationFrame(
            animate
        )
    }

    window.addEventListener(
        'resize',
        () => {

            resize()

            particles = []

            const target =
                Math.max(

                    Math.floor(
                        (width * height)
                        / 18000
                    ),

                    100
                )

            for (
                let i = 0;
                i < target;
                i++
            ) {

                particles.push(
                    new Particle()
                )
            }
        }
    )

    resize()

    const target =
        Math.max(

            Math.floor(
                (width * height)
                / 18000
            ),

            100
        )

    for (
        let i = 0;
        i < target;
        i++
    ) {

        particles.push(
            new Particle()
        )
    }

    animate()
}

// =========================
// INIT
// =========================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        initNavigation()

        initParticles()

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
