import { validateEmail, showMessage } from './utils.js'
import { User } from './userModel.js'
import { sendData } from '../api.js'
import { showLoader, hideLoader } from '../ui.js'

export function initForm(apiURL) {
    const container = document.getElementById('formContainer')

    container.innerHTML = `
        <form id="registerForm" novalidate>
            <label for="username">Nombre de usuario</label>
            <input type="text" id="username" name="username" required minlength="3" maxlength="20">

            <label for="email">Correo electrónico</label>
            <input type="email" id="email" name="email" required>
        
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" required minlength="8">

            <label for="confirmPassword">Confirmar contraseña</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>

            <button type="submit">Registrarse</button>
            <p id="formMessage" class="message"></p>
        </form>
    `

    const form = document.getElementById('registerForm')
    const msg = document.getElementById('formMessage')

    form.addEventListener('submit', async e => {
        e.preventDefault()
        msg.textContent = ''

        const data = Object.fromEntries(new FormData(form))
        const { username, email, password, confirmPassword } = data

        if (username.length < 1) return showMessage(msg, 'Escribe un nombre usuario.')
        if (username.length < 3) return showMessage(msg, 'El nombre de usuario es demasiado corto.')
        if (!validateEmail(email)) return showMessage(msg, "Correo electrónico inválido.")
        if (password.length < 8) return showMessage(msg, 'La contraseña debe tener al menos 8 caracteres.')
        if (password !== confirmPassword) return showMessage(msg, 'Las contraseñas no coinciden.')

        const user = new User(username, email, password)
        showLoader(container)

        try {
            const result = await sendData(apiURL + '/register', user)
            hideLoader(container)
            result.success
                ? showMessage(msg, '¡Registro exitoso!', 'success')
                : showMessage(msg, result.message || 'Error al registrar.')
        } catch (err) {
            hideLoader(container)
            showMessage(msg, 'Error de conexión.')
            if (DEBUG) console.error(err)
        }
    })
}