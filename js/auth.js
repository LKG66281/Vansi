async function signUp() {

    const email =
        prompt("Enter Email")

    const password =
        prompt("Enter Password")

    if (!email || !password) return

    const { data, error } =
        await supabaseClient.auth.signUp({

            email: email,
            password: password
        })

    if (error) {
        alert(error.message)
        return
    }

    alert("Signup successful")
}

async function signIn() {

    const email =
        prompt("Enter Email")

    const password =
        prompt("Enter Password")

    if (!email || !password) return

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({

            email: email,
            password: password
        })

    if (error) {
        alert(error.message)
        return
    }

    alert("Login successful")

    window.location.href = "dashboard.html"
}

function handleSignUp() {
    signUp()
}

function handleSignIn() {
    signIn()
}