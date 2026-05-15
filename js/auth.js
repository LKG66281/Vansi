document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // ELEMENTS
    // =========================

    const loginForm =
        document.getElementById('login-form')

    const signupForm =
        document.getElementById('signup-form')

    const loginTab =
        document.getElementById('login-tab')

    const signupTab =
        document.getElementById('signup-tab')

    const switchBtn =
        document.getElementById('switch-btn')

    const switchText =
        document.getElementById('switch-text')

    const loginBtn =
        document.getElementById('login-btn')

    const signupBtn =
        document.getElementById('signup-btn')

    const toast =
        document.getElementById('toast')

    let isLogin = true

    // =========================
    // PARTICLES
    // =========================

    function createParticles() {

        const canvas =
            document.getElementById('particles')

        const ctx =
            canvas.getContext('2d')

        function resize() {

            canvas.width =
                window.innerWidth

            canvas.height =
                window.innerHeight
        }

        resize()

        window.addEventListener(
            'resize',
            resize
        )

        let particles = []

        class Particle {

            constructor() {
                this.reset()
            }

            reset() {

                this.x =
                    Math.random() * canvas.width

                this.y =
                    Math.random() * canvas.height

                this.size =
                    Math.random() * 2.5 + 0.5

                this.speedX =
                    Math.random() * 0.6 - 0.3

                this.speedY =
                    Math.random() * 0.6 - 0.3

                this.opacity =
                    Math.random() * 0.5 + 0.2
            }

            update() {

                this.x += this.speedX
                this.y += this.speedY

                if (
                    this.x < 0 ||
                    this.x > canvas.width
                ) {
                    this.speedX *= -1
                }

                if (
                    this.y < 0 ||
                    this.y > canvas.height
                ) {
                    this.speedY *= -1
                }
            }

            draw() {

                ctx.fillStyle =
                    `rgba(100,220,255,${this.opacity})`

                ctx.beginPath()

                ctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2
                )

                ctx.fill()
            }
        }

        for (let i = 0; i < 120; i++) {

            particles.push(
                new Particle()
            )
        }

        function animate() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            )

            for (let p of particles) {

                p.update()
                p.draw()
            }

            requestAnimationFrame(
                animate
            )
        }

        animate()
    }

    createParticles()

    // =========================
    // SWITCH LOGIN / SIGNUP
    // =========================

    function switchToLogin() {

        isLogin = true

        loginForm.classList.add('active')

        signupForm.classList.remove('active')

        loginTab.classList.add('active')

        signupTab.classList.remove('active')

        switchText.textContent =
            "Don't have an account?"

        switchBtn.textContent =
            "Sign up"
    }

    function switchToSignup() {

        isLogin = false

        signupForm.classList.add('active')

        loginForm.classList.remove('active')

        signupTab.classList.add('active')

        loginTab.classList.remove('active')

        switchText.textContent =
            "Already have an account?"

        switchBtn.textContent =
            "Login"
    }

    loginTab.addEventListener(
        'click',
        switchToLogin
    )

    signupTab.addEventListener(
        'click',
        switchToSignup
    )

    switchBtn.addEventListener(
        'click',
        () => {

            if (isLogin)
                switchToSignup()

            else
                switchToLogin()
        }
    )

    // =========================
    // TOAST
    // =========================

    function showToast(
        message,
        type = 'error'
    ) {

        toast.textContent = message

        toast.style.borderColor =
            type === 'success'
            ? '#67f9b8'
            : '#ff6b6b'

        toast.classList.add('show')

        setTimeout(() => {

            toast.classList.remove(
                'show'
            )

        }, 4000)
    }

    // =========================
    // LOGIN
    // =========================

    async function handleLogin(e) {

        e.preventDefault()

        const email =
            document.getElementById(
                'login-email'
            ).value

        const password =
            document.getElementById(
                'login-password'
            ).value

        if (!email || !password) {

            showToast(
                "Fill all fields"
            )

            return
        }

        loginBtn.classList.add(
            'loading'
        )

        try {

            const { data, error } =
                await supabaseClient
                .auth
                .signInWithPassword({

                    email: email,
                    password: password
                })

            if (error) {

                throw error
            }

            showToast(
                "Login successful",
                "success"
            )

            setTimeout(() => {

                window.location.href =
                    "dashboard.html"

            }, 1000)

        } catch (error) {

            showToast(
                error.message
            )

        } finally {

            loginBtn.classList.remove(
                'loading'
            )
        }
    }

    // =========================
    // SIGNUP
    // =========================

    async function handleSignup(e) {

        e.preventDefault()

        const username =
            document.getElementById(
                'signup-username'
            ).value

        const email =
            document.getElementById(
                'signup-email'
            ).value

        const password =
            document.getElementById(
                'signup-password'
            ).value

        const confirm =
            document.getElementById(
                'signup-confirm'
            ).value

        if (!username ||
            !email ||
            !password ||
            !confirm) {

            showToast(
                "Fill all fields"
            )

            return
        }

        if (password !== confirm) {

            showToast(
                "Passwords do not match"
            )

            return
        }

        signupBtn.classList.add(
            'loading'
        )

        try {

            const { data, error } =
                await supabaseClient
                .auth
                .signUp({

                    email: email,
                    password: password
                })

            if (error) {

                throw error
            }

            // SUCCESS MESSAGE

            document
                .getElementById(
                    'verification-notice'
                )
                .classList
                .remove('hidden')

            showToast(
                "Signup successful",
                "success"
            )

            signupForm.reset()

            // AUTO SWITCH

            setTimeout(() => {

                switchToLogin()

            }, 3000)

        } catch (error) {

            showToast(
                error.message
            )

        } finally {

            signupBtn.classList.remove(
                'loading'
            )
        }
    }

    // =========================
    // PASSWORD RESET
    // =========================

    document
        .getElementById(
            'forgot-password'
        )
        .addEventListener(
            'click',
            async (e) => {

                e.preventDefault()

                const email =
                    document
                    .getElementById(
                        'login-email'
                    ).value

                if (!email) {

                    showToast(
                        "Enter your email"
                    )

                    return
                }

                try {

                    const { error } =
                        await supabaseClient
                        .auth
                        .resetPasswordForEmail(
                            email
                        )

                    if (error) {

                        throw error
                    }

                    showToast(
                        "Reset email sent",
                        "success"
                    )

                } catch (err) {

                    showToast(
                        err.message
                    )
                }
            }
        )

    // =========================
    // EVENTS
    // =========================

    loginForm.addEventListener(
        'submit',
        handleLogin
    )

    signupForm.addEventListener(
        'submit',
        handleSignup
    )

    // =========================
    // FOCUS
    // =========================

    setTimeout(() => {

        document
            .getElementById(
                'login-email'
            )
            .focus()

    }, 600)
})
