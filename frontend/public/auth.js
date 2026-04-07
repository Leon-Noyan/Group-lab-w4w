const API_URL = 'https://group-lab-w4w-backend.vercel.app/api/auth'

function getSignupValues() {
    const username = document.getElementById('signup-username').value
    const password = document.getElementById('signup-password').value
    const email = document.getElementById('signup-email').value
    return { username, password, email }
}

function getLoginValues() {
    const username = document.getElementById('login-username').value
    const password = document.getElementById('login-password').value
    return { username, password }
}

async function register() {
    const { username, password, email } = getSignupValues()

    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
    })

    const data = await res.json()
    showSignupMessage(data.message)
}

async function login() {
    const { username, password } = getLoginValues()

    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })

    const data = await res.json()
    showLoginMessage(data.message)

    if (data.token) {
        localStorage.setItem('token', data.token)
        window.location.href = 'index.html'
    }
}

function showLoginMessage(msg) {
    document.getElementById('message').innerText = msg
}

function showSignupMessage(msg) {
    document.getElementById('signup-message').innerText = msg
}

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn')
    const signupBtn = document.getElementById('signup-btn')
    const showSignup = document.getElementById('show-signup')
    const showLogin = document.getElementById('show-login')
    const loginForm = document.getElementById('login-form')
    const signupForm = document.getElementById('signup-form')

    loginBtn.addEventListener('click', login)
    signupBtn.addEventListener('click', register)

    showSignup.addEventListener('click', () => {
        loginForm.style.display = 'none'
        signupForm.style.display = 'block'
    })
    showLogin.addEventListener('click', () => {
        loginForm.style.display = 'block'
        signupForm.style.display = 'none'
    })
})
