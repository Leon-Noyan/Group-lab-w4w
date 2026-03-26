const API_URL = 'http://localhost:3000/api/auth'

function getValues() {
 const username = document.getElementById('username').value
 const password = document.getElementById('password').value
 const email = document.getElementById('email').value
 return { username, password, email }
}

async function register() {
 const { username, password, email } = getValues()

 const res = await fetch(`${API_URL}/register`, {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password, email })
 })

 const data = await res.json()
 showMessage(data.message)
}

async function login() {
 const { username, password } = getValues()

 const res = await fetch(`${API_URL}/login`, {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username, password })
 })

 const data = await res.json()
 showMessage(data.message)

 if (data.token) {
  localStorage.setItem('token', data.token)
 }
}

function showMessage(msg) {
 document.getElementById('message').innerText = msg
}
